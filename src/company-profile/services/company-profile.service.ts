import { HttpException, HttpStatus, Injectable, UploadedFile, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { CompanyUserEntity } from 'src/auth/models/company_user.entity';
import { CompanyUser } from 'src/auth/models/company_user.interface';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { Repository, UpdateResult } from 'typeorm';
import { removeFile } from '../helpers/image-storage';
import { CompanyProfileEntity } from '../models/company_profile.entity';
import { CompanyProfile } from '../models/company_profile.interface';

@Injectable()
export class CompanyProfileService {

  constructor(
    private companyAuthService: CompanyAuthService,
      @InjectRepository(CompanyProfileEntity)
      private readonly companyProfileRepository: Repository<CompanyProfileEntity>
    ) {}

  registerCompanyProfile(profile: CompanyProfile, user_id: number): Observable<CompanyProfile> {
    const { company_name, company_information, meeting_link } = profile;
    return from(
      this.companyProfileRepository.save({
        company_name,
        company_information,
        meeting_link,
      }),
    ).pipe(
      map((profile: CompanyProfile) => {
        this.companyAuthService.updateCompanyProfileById(user_id, profile.id);
        return profile;
      }),
    );
  }

  findUserById(id: number): Observable<CompanyProfile> {
    return from(
      this.companyProfileRepository.findOne({ id }),
    ).pipe(
      map((user: CompanyProfile) => {
        if (!user) {
          throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
        }
        return user;
      }),
    );
  }

  updateUserImageById(id: number, image_path: string): Observable<UpdateResult> {
    const profile: CompanyProfile = new CompanyProfileEntity();
    profile.id = id;
    profile.image_path = image_path;
    return from(this.companyProfileRepository.update(id, profile));
  }
    
  getAllCompanyProfiles(): Promise<CompanyProfileEntity[]> {
    return this.companyProfileRepository.find(
      {
        select: ['company_name', 'company_information', 'image_path', 'meeting_link'],
      },
    );
  }

}
