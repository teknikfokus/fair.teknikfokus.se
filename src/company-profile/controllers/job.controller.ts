import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, Request, Logger} from '@nestjs/common';
import { from, Observable, switchMap } from 'rxjs';
import { IsCompanyGuard } from 'src/auth/guards/is-company.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CompanyUser } from 'src/auth/models/company_user.interface';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { IsCompanyCreatorGuard } from '../guards/is_company_creator.guard';
import { CompanyProfile } from '../models/company_profile.interface';
import { JobEntity } from '../models/job.entity';
import { Job } from '../models/job.interface';
import { JobService } from '../services/job.service';

@Controller()
export class JobController {

    constructor(
        private jobService: JobService,
        private companyAuthService: CompanyAuthService
      ) {}


    @UseGuards(JwtGuard, IsCompanyGuard, IsCompanyCreatorGuard)
    @Post('dashboard/company/job/create')
    @HttpCode(HttpStatus.OK)
    createJob(@Body() newJob: Job, @Request() req): Observable<CompanyUser> {
      return from(this.companyAuthService.findUserById(req.user.id)).pipe(
        switchMap((user: CompanyUser) => {
          return this.jobService.createJob(newJob, user.company_profile_id);
        })
      );
    }
  
    @UseGuards(JwtGuard, IsCompanyGuard, IsCompanyCreatorGuard)
    @Post('dashboard/company/job/:jobid')
    @HttpCode(HttpStatus.OK)
    editJobProfile(
      @Body() jobEdits: Job, @Request() req, @Param() param): Observable<CompanyProfile> {
      return from(this.companyAuthService.findUserById(req.user.id)).pipe(
        switchMap((user: CompanyUser) => {
          return this.jobService.editJobProfile(jobEdits, user.company_profile_id, param.jobid);
        })
      );
    }
  
    @UseGuards(JwtGuard)
    @Get('companies/:company_name/jobs')
    @HttpCode(HttpStatus.OK)
    getJobsFromCompany(
      @Param() param): Observable<JobEntity[]> {
      return this.jobService.getJobsFromCompany(param.company_name);
    }

    @UseGuards(JwtGuard)
    @Get('/companies/:company_name/jobs/:id')
    @HttpCode(HttpStatus.OK)
    getJob(
      @Param() params): Observable<Job> {
        return this.jobService.findJobById(params.id);
    }
}
