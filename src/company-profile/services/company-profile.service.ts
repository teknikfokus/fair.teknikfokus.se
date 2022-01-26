import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map,switchMap, Observable } from 'rxjs';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { Repository, UpdateResult } from 'typeorm';
import { CompanyProfileEntity } from '../models/company_profile.entity';
import { CompanyProfile } from '../models/company_profile.interface';
import { JobEntity } from '../models/job.entity';
import { Job } from '../models/job.interface';

@Injectable()
export class CompanyProfileService {

  constructor(
      private companyAuthService: CompanyAuthService,
      @InjectRepository(JobEntity)
      private readonly jobRepository: Repository<JobEntity>,
      @InjectRepository(CompanyProfileEntity)
      private readonly companyProfileRepository: Repository<CompanyProfileEntity>
    ) {}

  registerCompanyProfile(profile: CompanyProfile, user_id: number): Observable<CompanyProfile> {
    const { company_name, company_information, meeting_link, summer_internship, master_thesis, trainee_programme } = profile;
    return from(
      this.companyProfileRepository.save({
        company_name,
        company_information,
        meeting_link,
        summer_internship,
        master_thesis,
        trainee_programme
      }),
    ).pipe(
      map((profile: CompanyProfile) => {
        this.companyAuthService.updateCompanyProfileById(user_id, profile.id);
        return profile;
      }),
    );
  }
  
  editCompanyProfile(newdata: CompanyProfile,profileId: number): Observable<CompanyProfile> {
    return from(this.findProfileById(profileId)).pipe(
      map((profile: CompanyProfile) => {
        newdata.image_path = profile.image_path;
        from(this.companyProfileRepository.update(profile.id,newdata));
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
        select: ['company_name', 'image_path'],
      },
    );
  }

  createJob(profile: Job, user_id: number): Observable<Job> {
    const { job_description, job_position } = profile;
    return from(
      this.jobRepository.save({
        job_description,
        job_position,
        company_id: user_id
      }),
    )
  }
}