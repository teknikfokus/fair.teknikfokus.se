import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, UseInterceptors, Request, UploadedFile, HttpException, Logger} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { from, map, Observable, of, switchMap, tap } from 'rxjs';
import slugify from 'slugify';
import { IsCompanyGuard } from 'src/auth/guards/is-company.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CompanyUser } from 'src/auth/models/company_user.interface';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { IsCreatorGuard } from '../guards/is-creator.guard';
import { saveImageToStorage } from '../helpers/image-storage';
import { CompanyProfile } from '../models/company_profile.interface';
import { JobEntity } from '../models/job.entity';
import { Job } from '../models/job.interface';
import { CompanyProfileService } from '../services/company-profile.service';
@Controller()
export class CompanyProfileController {

  constructor(
    private companyProfileService: CompanyProfileService,
    private companyAuthService: CompanyAuthService
  ) {}

  @UseGuards(JwtGuard, IsCompanyGuard)
  @Post('dashboard/company')
  @HttpCode(HttpStatus.OK)
  registerCompanyProfile(@Body() profile: CompanyProfile, @Request() req): Observable<CompanyUser> {
    return from(this.companyAuthService.findUserById(req.user.id)).pipe(
      switchMap((user: CompanyUser) => {
        if(user.company_id != null) {
          throw new HttpException(
            { status: HttpStatus.FORBIDDEN, error: 'You have already created a profile.' },
            HttpStatus.FORBIDDEN,
          );
        }
        return this.companyProfileService.registerCompanyProfile(profile, req.user.id);
      })
    );
  }

  @UseGuards(JwtGuard, IsCompanyGuard, IsCreatorGuard)
  @Post('dashboard/company/edit')
  @HttpCode(HttpStatus.OK)
  editCompanyProfile(
    @Body() companyEdits: CompanyProfile, @Request() req): Observable<CompanyProfile> {
    return from(this.companyAuthService.findUserById(req.user.id)).pipe(
      switchMap((user: CompanyUser) => {
        return this.companyProfileService.editCompanyProfile(companyEdits, user.company_id);
      })
    );
  }

  @UseGuards(JwtGuard,IsCreatorGuard, IsCompanyGuard)
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  @Post('dashboard/company/upload_image')
  @HttpCode(HttpStatus.OK)
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req): Observable<{modifiedFileName: string } | { error: string }> {
    const fileName = file?.filename;

    if (!fileName) return of({ error: 'File must be a png, jpg/jpeg' });

    return from(this.companyAuthService.findUserById(req.user.id)).pipe(
      switchMap((user: CompanyUser) => {
        return this.companyProfileService.updateUserImageById(user.company_id, fileName).pipe(
          map(() => ({
            modifiedFileName: file.filename,
          })),
        );
        }
      )
    );
  }

  @UseGuards(JwtGuard)
  @Get('companies')
  getAllProfiles() {
    return this.companyProfileService.getAllCompanyProfiles();
  }

  @UseGuards(JwtGuard)
  @Get('companies/:company_name')
  getProfile(@Param() param) {
    return this.companyProfileService.getProfile(param.company_name);
  }

  @UseGuards(JwtGuard, IsCompanyGuard,IsCreatorGuard)
  @Post('dashboard/company/job/create')
  @HttpCode(HttpStatus.OK)
  createJob(@Body() newJob: Job, @Request() req): Observable<CompanyUser> {
    return from(this.companyAuthService.findUserById(req.user.id)).pipe(
      switchMap((user: CompanyUser) => {
        return this.companyProfileService.createJob(newJob, user.company_id);
      })
    );
  }

  @UseGuards(JwtGuard, IsCompanyGuard, IsCreatorGuard)
  @Post('dashboard/company/job/:jobid')
  @HttpCode(HttpStatus.OK)
  editJobProfile(
    @Body() jobEdits: Job, @Request() req, @Param() param): Observable<CompanyProfile> {
    return from(this.companyAuthService.findUserById(req.user.id)).pipe(
      switchMap((job: Job) => {
        return this.companyProfileService.editJobProfile(jobEdits, req.company_id, param.jobid);
      })
    );
  }

  @UseGuards(JwtGuard)
  @Get('dashboard/companies/:company_name/jobs')
  @HttpCode(HttpStatus.OK)
  getJobsFromCompany(
    @Request() req, @Param() param): Observable<JobEntity[]> {
    return this.companyProfileService.getJobsFromCompany(param.company_name);

  }
}

