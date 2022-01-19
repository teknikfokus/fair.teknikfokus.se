import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CompanyPostEntity } from '../models/post.entity';
import { CompanyPosted } from '../models/post.interface';

@Injectable()
export class CompanyAuthenticationService {
    constructor(
        @InjectRepository(CompanyPostEntity)
        private readonly companyRepository: Repository<CompanyPostEntity>
    ) {}

    createCompanyAccount(companyPost: CompanyPosted): Observable<CompanyPosted>{
        return from(this.companyRepository.save(companyPost));
    }
}
