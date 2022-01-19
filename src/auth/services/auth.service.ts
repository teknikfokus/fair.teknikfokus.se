import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
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
        private readonly companyRepository: Repository<UserEntity>
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
}
