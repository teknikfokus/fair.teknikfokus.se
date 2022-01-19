import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CompanyPostEntity } from '../models/user.entity';
import { CompanyPosted } from '../models/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    hashPassword(password: string): Observable<string> {
        return from(bcrypt.hash(password,12))
    }
    constructor(
        @InjectRepository(CompanyPostEntity)
        private readonly companyRepository: Repository<CompanyPostEntity>
    ) {}

    createCompanyAccount(companyPost: CompanyPosted): Observable<CompanyPosted>{
        return from(this.companyRepository.save(companyPost));
    }
}
