import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map,Observable } from 'rxjs';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { Repository } from 'typeorm';
import { CompanyProfileEntity } from '../models/company_profile.entity';
import { CompanyProfile } from '../models/company_profile.interface';
import { JobEntity } from '../models/job.entity';
import { Job } from '../models/job.interface';
import slugify from 'slugify';
import { removeFile } from '../../helpers/image-storage';
import { join } from 'path';

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
    const { name, information, meeting_link, fair_day , summer_internship, master_thesis, trainee_programme } = profile;
    return from(
      this.companyProfileRepository.save({
        name,
        slug_name: slugify(name),
        information,
        fair_day,
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
        newdata.slug_name = slugify(newdata.name)
        from(this.companyProfileRepository.update(profile.id,newdata));
        return newdata;
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

  findJobsById(id: number): Observable<Job> {
    return from(
      this.jobRepository.findOne({ id }),
    ).pipe(
      map((job: Job) => {
        if (!job) {
          throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
        }
        return job;
      }),
    );
  }

  updateUserImageById(id: number, image_path: string): Observable<CompanyProfile> {
    return from(
      this.companyProfileRepository.findOne({ id }),
    ).pipe(
      map((profile: CompanyProfile) => {
        const imagesFolderPath = join(process.cwd(), 'images');
        const fullImagePath = join(imagesFolderPath + '/' + profile.image_path);
        if(profile.image_path !== 'default.jpg'){
          removeFile(fullImagePath);
        }
        profile.id = id;
        profile.image_path = image_path;
        from(this.companyProfileRepository.update(id, profile));
        return profile;
      }),
    );
  }

  getProfile(slug_name: string): Observable<CompanyProfile> {
    return from(
      this.companyProfileRepository.findOne({ slug_name }),
    ).pipe(
      map((profile: CompanyProfile) => {
        if (!profile) {
          throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }
        return profile;
      }),
    );
  }
    
  getAllCompanyProfiles(): Promise<CompanyProfileEntity[]> {
    return this.companyProfileRepository.find(
      {
        select: ['name', 'slug_name', 'image_path', 'summer_internship', 'master_thesis', 'trainee_programme', 'fair_day'],
      },
    );
  }
}
