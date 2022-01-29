import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Repository, UpdateResult } from 'typeorm';
import { StudentUserEntity } from '../models/student_user.entity';
import { StudentUser } from '../models/student_user.interface';
import * as bcrypt from 'bcrypt';
import { ForgottenPasswordEntity } from '../models/forgotten_password.entity';
import { v4 as uuidv4 } from 'uuid';
import { link } from 'fs';
import { MailService } from 'src/mail/mail.service';
import passport from 'passport';

@Injectable()
export class StudentAuthService {
  private readonly logger = new Logger(StudentAuthService.name);

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12))
  }
  constructor(
    @InjectRepository(StudentUserEntity)
    private readonly studentRepository: Repository<StudentUserEntity>,

    @InjectRepository(ForgottenPasswordEntity)
    private readonly forgottenPasswordRepository: Repository<ForgottenPasswordEntity>,

    private jwtService: JwtService,

    private mailService: MailService,
  ) { }

  doesUserExist(email: string): Observable<boolean> {
    email = email.toLocaleLowerCase();
    return from(this.studentRepository.findOne({ email })).pipe(
      switchMap((user: StudentUser) => {
        return of(!!user);
      }),
    );
  }

  findStudentUserById(id: number): Observable<StudentUser> {
    return from(
      this.studentRepository.findOne({ id }),
    ).pipe(
      map((user: StudentUser) => {
        if (!user) {
          throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        delete user.password;
        return user;
      }),
    );
  }

  registerStudentAccount(user: StudentUser): Observable<StudentUser> {
    const { email, password } = user;
    const lowerEmail = email.toLocaleLowerCase();

    return this.doesUserExist(lowerEmail).pipe(
      tap((doesUserExist: boolean) => {
        if (doesUserExist)
          throw new HttpException(
            'A user has already been created with this email address',
            HttpStatus.BAD_REQUEST,
          );
      }),
      switchMap(() => {
        if((email.replace(/\s+/g, "").length) !== 24 || !email.includes('-s@student.lu.se')){
          throw new HttpException(
            { status: HttpStatus.FORBIDDEN, error: 'Email address has to be a valid LU-email' },
            HttpStatus.FORBIDDEN,
          );
        }
        return this.hashPassword(password).pipe(
          switchMap((hashedPassword: string) => {
            return from(
              this.studentRepository.save({
                email: lowerEmail,
                password: hashedPassword,
              }),
            ).pipe(
              map((user: StudentUser) => {
                delete user.password;
                return user;
              }),
            );
          }),
        );
      }),
    );
  }

  validateUser(email: string, password: string): Observable<StudentUser> {
    const lowerEmail = email.toLocaleLowerCase();
    return from(
      this.studentRepository.findOne(
        { email: lowerEmail },
        {
          select: ['id', 'email', 'password', 'student_profile_id'],
        },
      ),
    ).pipe(
      switchMap((user: StudentUser) => {
        if (!user) {
          throw new HttpException(
            { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
            HttpStatus.FORBIDDEN,
          );
        }
        return from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              delete user.password;
              return user;
            }
            throw new HttpException(
              { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
              HttpStatus.FORBIDDEN,
            );
          }),
        );
      }),
    );
  }

  login(user: StudentUser): Observable<string> {
    const { email, password } = user;
    return this.validateUser(email, password).pipe(
      switchMap((user: StudentUser) => {
        if (user) {
          // create JWT - credentials
          return from(this.jwtService.signAsync({ user: {...user, type: "student"} }));
        }
      }),
    );
  }
  
  getJwtUser(jwt: string): Observable<StudentUser | null> {
    return from(this.jwtService.verifyAsync(jwt)).pipe(
      map(({ user }: { user: StudentUser }) => {
        return user;
      }),
      catchError(() => {
        return of(null);
      }),
    );
  }

  createForgottenPasswordToken(forgottenPassword: ForgottenPassword): Observable<ForgottenPassword> {
    const {email} = forgottenPassword;

    return this.doesUserExist(email).pipe(
      tap((doesUserExist: boolean) => {
        if (!doesUserExist){
          throw new HttpException(
            'This user does not exist.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      switchMap(() => {
        return from(
          this.forgottenPasswordRepository.save({
            email,
            newPasswordToken: (Math.floor(Math.random() * (9000000)) + 1000000).toString(), //Generate 7 digits number,
            timestamp: new Date(),
          }),
          ).pipe(
            map((user: ForgottenPassword) => {
              return user;
            }),
          );
          }),
        );
      }),
    );
  }
  login(user: StudentUser): Observable<string> {
    const { email, password } = user;
    return this.validateUser(email, password).pipe(
      switchMap((user: StudentUser) => {
        if (user) {
          // create JWT - credentials
          return from(this.jwtService.signAsync({ user: { ...user, type: "student" } }));
        }
      }),
    );
  }

  getJwtUser(jwt: string): Observable<StudentUser | null> {
    return from(this.jwtService.verifyAsync(jwt)).pipe(
      map(({ user }: { user: StudentUser }) => {
        return user;
      }),
      catchError(() => {
        return of(null);

      }),
    );
  }

  updateStudentProfileById(id: number, student_id: number): Observable<UpdateResult> {
    const user: StudentUser = new StudentUserEntity();
    user.id = id;
    user.student_profile_id = student_id;
    return from(this.studentRepository.update(id, user));

  sendRecoveryLinkMail(token: ForgottenPasswordEntity) {
    this.mailService.sendMail(
      <string>token.email,
      "Återställ ditt lösenord",
      "Här kommer länk för att återställa ditt lösenord: " + process.env.URL + "/recovery/" + token.token_link
    );
  }

  getForgottenPasswordByTokenLink(link: string) {
    return from(this.forgottenPasswordRepository.findOne({ token_link: link })).pipe(
      switchMap((token: ForgottenPasswordEntity) => {
        return of(token);
      }),
    );
  }

  getForgottenPasswordByEmail(email: string) {
    email = email.toLocaleLowerCase();
    return from(this.forgottenPasswordRepository.findOne({ email })).pipe(
      switchMap((token: ForgottenPasswordEntity) => {
        return of(token);
      }),
    );
  }

  createForgottenPasswordToken(email: string) {
    email = email.toLocaleLowerCase();
    return from(this.doesUserExist(email).pipe(
      switchMap((doesUserExist: boolean) => {
        if (!doesUserExist) {
          this.logger.warn("Someone tried to generate forgotten password token for non-existant student user");
          return of(null);
        }

        return from(this.getForgottenPasswordByEmail(email)).pipe(
          tap((token: ForgottenPasswordEntity) => {
            const halfHour = Date.now() - (60 * 30 * 1000);

            if (token != null && token.timestamp.getTime() < halfHour) {
              const token_link = uuidv4();

              this.forgottenPasswordRepository.update(token.id, {
                token_link: token_link,
                timestamp: new Date()
              });

              token.token_link = token_link;

              this.logger.log("Succesfully updated forgotten password token");

              this.sendRecoveryLinkMail(token);
            } else if (token == null) {
              const token_link = uuidv4();

              this.forgottenPasswordRepository.save({
                email,
                token_link: token_link,
                timestamp: new Date(),
              });

              this.logger.log("Succesfully generated forgotten password token");

              this.sendRecoveryLinkMail({
                id: null,
                email: email,
                token_link: token_link,
                timestamp: null
              });
            }
          })
        );
      }),
      map(() => {
        return {
          "message": 'E-mail sent away with link to recover password if user exists',
          "statusCode": '201'
        };
      })
    ));
  }

  updatePasswordWithLink(token_link: string, password: string) {
    return this.getForgottenPasswordByTokenLink(token_link).pipe(
      switchMap((token: ForgottenPasswordEntity) => {
        const oneHour = Date.now() - (60 * 60 * 1000);

        if (token == null) {
          throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
        } else if (token.timestamp.getTime() < oneHour) {
          throw new HttpException('Link expired', HttpStatus.GONE);
        }

        const email = <string>token.email;

        return from(
          this.studentRepository.findOne(
            { email: email },
            {
              select: ['id'],
            },
          ),
        ).pipe(
          switchMap((user: StudentUser) => {
            if (user == null) {
              this.logger.warn('Could not find user when trying to recover password');
              throw new HttpException('Link expired', HttpStatus.GONE);
            }

            const user_id = user.id;

            return this.hashPassword(password).pipe(
              tap((hashedPassword: string) => {
                this.studentRepository.update(user_id, {
                  password: hashedPassword,
                });
                this.forgottenPasswordRepository.delete(token.id);
              }),
              map(() => {
                return {
                  "message": 'Password succesfully updated',
                  "statusCode": '200'
                };
              }),
            );
          }),
        );
      }),
    );
  }
}

  updateStudentProfileById(id: number, student_id: number): Observable<UpdateResult> {
    const user: StudentUser = new StudentUserEntity();
    user.id = id;
    user.student_profile_id = student_id;
    return from(this.studentRepository.update(id, user));
  }
}
