import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, UseInterceptors, Request, UploadedFile, HttpException} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { IsCompanyGuard } from 'src/auth/guards/is-company.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CompanyUser } from 'src/auth/models/company_user.interface';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { FairDayGuard } from '../guards/fair_day.guard';
import { IsCompanyCreatorGuard } from '../guards/is_company_creator.guard';
import { saveImageToStorage } from '../../helpers/image-storage';
import { CompanyProfile } from '../models/company_profile.interface';
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
        if(user.company_profile_id != null) {
          throw new HttpException(
            { status: HttpStatus.FORBIDDEN, error: 'You have already created a profile.' },
            HttpStatus.FORBIDDEN,
          );
        }
        return this.companyProfileService.registerCompanyProfile(profile, req.user.id);
      })
    );
  }

  @UseGuards(JwtGuard, IsCompanyGuard, IsCompanyCreatorGuard)
  @Post('dashboard/company/edit')
  @HttpCode(HttpStatus.OK)
  editCompanyProfile(
    @Body() companyEdits: CompanyProfile, @Request() req): Observable<CompanyProfile> {
    return from(this.companyAuthService.findUserById(req.user.id)).pipe(
      switchMap((user: CompanyUser) => {
        return this.companyProfileService.editCompanyProfile(companyEdits, user.company_profile_id);
      })
    );
  }

  @UseGuards(JwtGuard,IsCompanyCreatorGuard, IsCompanyGuard)
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
        return this.companyProfileService.updateUserImageById(user.company_profile_id, fileName).pipe(
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

  @UseGuards(JwtGuard)
  @Get('companies/:job_id')
  getJob(@Param() param) {
    return this.companyProfileService.getProfile(param.job_id);
  }
}

