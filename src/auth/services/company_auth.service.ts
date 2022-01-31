import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Repository, UpdateResult } from 'typeorm';
import { CompanyUserEntity } from '../models/company_user.entity';
import { CompanyUser } from '../models/company_user.interface';
import { MailService } from '../../mail/mail.service'
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompanyAuthService {
    hashPassword(password: string): Observable<string> {
        return from(bcrypt.hash(password,12))
    }

  constructor(
      @InjectRepository(CompanyUserEntity)
      private readonly companyRepository: Repository<CompanyUserEntity>,
      private jwtService: JwtService,
      private mailService: MailService,
  ) {}

  findUserById(id: number): Observable<CompanyUser> {
    return from(
      this.companyRepository.findOne({ id }),
    ).pipe(
      map((user: CompanyUser) => {
        if (!user) {
          throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }
        delete user.password;
        return user;
      }),
    );
  }

  doesUserExist(email: string): Observable<boolean> {
    return from(this.companyRepository.findOne({ email })).pipe(
      switchMap((user: CompanyUser) => {
        return of(!!user);
      }),
    );
  }

  registerCompanyAccount(user: CompanyUser): Observable<CompanyUser> {
    const { email, password } = user;
    const lowerEmail = email.toLocaleLowerCase();

    return this.doesUserExist(lowerEmail).pipe(
      tap((doesUserExist: boolean) => {
        if (doesUserExist){
          throw new HttpException(
            'A user has already been created with this email address',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      switchMap(() => {
        return this.hashPassword(password).pipe(
          switchMap((hashedPassword: string) => {
            return from(
              this.companyRepository.save({
                email: lowerEmail,
                password: hashedPassword,
              }),
            ).pipe(
              map((user: CompanyUser) => {
                delete user.password;
                this.mailService.sendMail(user.email, "Välkommen!", "Välkommen till Teknikfokus");
                return user;
              }),
            );
          }),
        );
      })
    );
  }
                
  login(user: CompanyUser): Observable<string> {
    // create JWT - credentials
    if (user) {
      return from(this.jwtService.signAsync({ user: {...user, type: "company"} }));
    }
    return;
  }
    

  validateUser(email: string, password: string): Observable<CompanyUser> {
    email = email.toLowerCase();
    return from(
      this.companyRepository.findOne(
        { email },
        {
          select: ['id', 'email', 'password', 'company_profile_id'],
        },
      ),
    ).pipe(
      switchMap((user: CompanyUser) => {
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

  
  getJwtUser(jwt: string): Observable<CompanyUser | null> {
    return from(this.jwtService.verifyAsync(jwt)).pipe(
      map(({ user }: { user: CompanyUser }) => {
        return user;
      }),
      catchError(() => {
        return of(null);
      }),
    );
  }

  updateCompanyProfileById(id: number, company_id: number): Observable<UpdateResult> {
    const user: CompanyUser = new CompanyUserEntity();
    user.id = id;
    user.company_profile_id = company_id;
    return from(this.companyRepository.update(id, user));
  }

  passwordReset(id: number, new_password: string): Observable<UpdateResult> {
    const user: CompanyUser = new CompanyUserEntity();
    user.id = id;

    return this.hashPassword(new_password).pipe(
      switchMap((hashedPassword: string) => {
        user.password = hashedPassword;
        return from(
          this.companyRepository.update(id, user),
        )
      }),
    );
  }
}
