import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Repository, TransactionManager } from 'typeorm';
import { StudentUserEntity } from '../models/student_user.entity';
import { StudentUser } from '../models/student_user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentAuthService {
    hashPassword(password: string): Observable<string> {
        return from(bcrypt.hash(password,12))
    }
    constructor(
        @InjectRepository(StudentUserEntity)
        private readonly studentRepository: Repository<StudentUserEntity>,
        private jwtService: JwtService,
    ) {}

    doesUserExist(email: string): Observable<boolean> {
      return from(this.studentRepository.findOne({ email })).pipe(
        switchMap((user: StudentUser) => {
          return of(!!user);
        }),
      );
    }
    

    registerStudentAccount(user: StudentUser): Observable<StudentUser> {
      const {email, password } = user;
  
      return this.doesUserExist(email).pipe(
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
                  email,
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
        return from(
          this.studentRepository.findOne(
            { email },
            {
              select: ['id', 'email', 'password'],
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
                return from(this.jwtService.signAsync({ user }));
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
}