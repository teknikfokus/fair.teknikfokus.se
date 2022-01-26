import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map,switchMap, Observable } from 'rxjs';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { Repository, UpdateResult } from 'typeorm';
import { CompanyProfileEntity } from '../models/company_profile.entity';
import { CompanyProfile } from '../models/company_profile.interface';
import { JobEntity } from '../models/job.entity';
import { Job } from '../models/job.interface';
import slugify from 'slugify';

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
    const { name, information, meeting_link, summer_internship, master_thesis, trainee_programme } = profile;
    return from(
      this.companyProfileRepository.save({
        name,
        slug_name: slugify(name),
        information,
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
        select: ['name', 'image_path'],
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

  editJobProfile(editJob: Job,profileId: number, jobid): Observable<CompanyProfile> {
    return from(this.findJobsById(jobid)).pipe(
      map((job: Job) => {
        if(job.company_id !== profileId) {
          throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
        }
        from(this.jobRepository.update(job,editJob));
        return editJob;
      }),
    );
  }
  getAllJobs(): Promise<JobEntity[]> {
    return this.jobRepository.find(
      {
        select: ['id', 'job_position', 'job_description'],
      },
    );
  }
  getJobsFromCompany(company_name : string): Observable<JobEntity[]> {
    return this.getProfile(company_name).pipe(
      switchMap((profile: CompanyProfile) => {
        return this.jobRepository.find(
          {
            select: ['id', 'job_position', 'job_description'],
            where: {'company_id': profile.id}
          },
        );
      }),
    );
  }
}
