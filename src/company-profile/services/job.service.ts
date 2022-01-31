import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map,switchMap, Observable, using } from 'rxjs';
import { Repository } from 'typeorm';
import { CompanyProfile } from '../models/company_profile.interface';
import { JobEntity } from '../models/job.entity';
import { Job } from '../models/job.interface';
import { CompanyProfileService } from './company-profile.service';

@Injectable()
export class JobService {
  constructor(
    private companyProfileService: CompanyProfileService,
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {}

  findJobById(id: number): Observable<Job> {
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

  editJobProfile(editJob: Job,profileId: number, jobid: number): Observable<CompanyProfile> {
    return from(this.findJobById(jobid)).pipe(
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
    return this.companyProfileService.getProfile(company_name).pipe(
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
