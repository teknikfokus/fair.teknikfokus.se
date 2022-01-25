import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, UseInterceptors, Request, UploadedFile, HttpException, Logger} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { from, map, Observable, of, switchMap, tap } from 'rxjs';
import { IsCompanyGuard } from 'src/auth/guards/is-company.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CompanyUser } from 'src/auth/models/company_user.interface';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { IsCreatorGuard } from '../guards/is-creator.guard';
import { saveImageToStorage } from '../helpers/image-storage';
import { CompanyProfile } from '../models/company_profile.interface';
import { CompanyProfileService } from '../services/company-profile.service';

@Controller()
export class CompanyProfileController {

  constructor(
    private companyProfileService: CompanyProfileService,
    private companyAuthService: CompanyAuthService
  ) {}

    // , IsCreatorGuard
  @UseGuards(JwtGuard, IsCompanyGuard)
  @Post('dashboard/company')
  @HttpCode(HttpStatus.OK)
  registerCompanyProfile(
    
    @Body() profile: CompanyProfile, @Request() req): Observable<CompanyUser> {
      /*
      if(req.user.type != 'company') {
        throw new HttpException(
          { status: HttpStatus.FORBIDDEN, error: 'Unauthorized.' },
          HttpStatus.FORBIDDEN,
        );
      }
      */
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
        if(user.company_id == null) {
          throw new HttpException(
            { status: HttpStatus.FORBIDDEN, error: 'Company profile has not been created yet.' },
            HttpStatus.FORBIDDEN,
          );
        }
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
}

