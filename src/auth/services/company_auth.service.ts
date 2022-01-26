import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { CompanyUserEntity } from '../models/company_user.entity';
import { CompanyUser } from '../models/company_user.interface';
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
    ) {}

    doesUserExist(email: string): Observable<boolean> {
      return from(this.companyRepository.findOne({ email })).pipe(
        switchMap((user: CompanyUser) => {
          return of(!!user);
        }),
      );
    }
    registerCompanyAccount(user: CompanyUser): Observable<CompanyUser> {
      const{ email, password } = user;
      return this.doesUserExist(email).pipe(
        tap((doesUserExist: boolean) => {
          if (doesUserExist)
            throw new HttpException(
              'A user has already been created with this email address',
              HttpStatus.BAD_REQUEST,
            );
        }),
        switchMap(() => {
          return this.hashPassword(password).pipe(
            switchMap((hashedPassword: string) => {
              return from(
                this.companyRepository.save({
                  email ,
                  password: hashedPassword,
                }),
              ).pipe(
                map((user: CompanyUser) => {
                  delete user.password;
                  return user;
                }),
              );
            }),
          );
        }),
      );
    }    
    validateUser(email: string, password: string): Observable<CompanyUser> {
        email = email.toLowerCase();
        return from(
          this.companyRepository.findOne(
            { email },
            {
              select: ['id', 'email', 'password'],
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
    login(user: CompanyUser): Observable<string> {
        const { email, password } = user;
        return this.validateUser(email, password).pipe(
            switchMap((user: CompanyUser) => {
                if (user) {
              // create JWT - credentials
                return from(this.jwtService.signAsync({ user }));
                }
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
}
