import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    hashPassword(password: string): Observable<string> {
        return from(bcrypt.hash(password,12))
    }
    constructor(
        @InjectRepository(UserEntity)
        private readonly companyRepository: Repository<UserEntity>,
        private jwtService: JwtService,
    ) {}

    registerCompanyAccount(user: User): Observable<User>{
        const {email, company_name, password, information} = user;


        return this.hashPassword(password).pipe(
            switchMap((hashedPassword: string) => {
                return from(this.companyRepository.save({
                    email,
                    company_name,
                    password: hashedPassword,
                    information
                })).pipe(
                    map((user: User) => {
                        delete user.password;
                        return user;
                    }),
                );
            }),
        );
    }
    validateUser(email: string, password: string): Observable<User> {
        return from(
          this.companyRepository.findOne(
            { email },
            {
              select: ['id', 'company_name', 'email', 'password', 'information'],
            },
          ),
        ).pipe(
          switchMap((user: User) => {
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
    login(user: User): Observable<string> {
        const { email, password } = user;
        return this.validateUser(email, password).pipe(
            switchMap((user: User) => {
                if (user) {
              // create JWT - credentials
                return from(this.jwtService.signAsync({ user }));
                }
            }),
        );
    }
    
      getJwtUser(jwt: string): Observable<User | null> {
        return from(this.jwtService.verifyAsync(jwt)).pipe(
          map(({ user }: { user: User }) => {
            return user;
          }),
          catchError(() => {
            return of(null);
          }),
        );
      }
}
