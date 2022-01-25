import { HttpException, HttpStatus, Injectable, UploadedFile, Request, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { Repository } from 'typeorm';
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
  
  findProfileById(id: number): Observable<CompanyProfile> {
    return from(
      this.companyProfileRepository.findOne({ id }),
    ).pipe(
      map((profile: CompanyProfile) => {
        if (!profile) {
          throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }
        return profile;
      }),
    );
  }

  updateUserImageById(id: number, image_path: string): Observable<CompanyProfile> {
    return from(
      this.companyProfileRepository.findOne({ id }),
    ).pipe(
      map((profile: CompanyProfile) => {
        profile.id = id;
        profile.image_path = image_path;
        from(this.companyProfileRepository.update(id, profile));
        return profile;
      }),
    );
  }
    
  getAllCompanyProfiles(): Promise<CompanyProfileEntity[]> {
    return this.companyProfileRepository.find(
      {
        select: ['company_name', 'company_information', 'image_path', 'meeting_link'],
      },
    );
  }

}
