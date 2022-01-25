import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, UseInterceptors, Request, UploadedFile, HttpException, Logger} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { from, map, Observable, of, switchMap, tap } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CompanyUser } from 'src/auth/models/company_user.interface';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { IsCreatorGuard } from '../guards/is-creator.guard';
import { removeFile, saveImageToStorage } from '../helpers/image-storage';
import { CompanyProfile } from '../models/company_profile.interface';
import { CompanyProfileService } from '../services/company-profile.service';

@Controller()
export class CompanyProfileController {

  constructor(
    private companyProfileService: CompanyProfileService,
    private companyAuthService: CompanyAuthService
  ) {}

    // , IsCreatorGuard
  @UseGuards(JwtGuard)
  @Post('dashboard/company')
  @HttpCode(HttpStatus.OK)
  register_company_profile(
    @Body() profile: CompanyProfile, @Request() req): Observable<CompanyUser> {
      return from(this.companyAuthService.findUserById(req.user.id)).pipe(
        switchMap((user: CompanyUser) => {
          if(user.company_id != null) {
            throw new HttpException(
              { status: HttpStatus.FORBIDDEN, error: 'You have already created an profile.' },
              HttpStatus.FORBIDDEN,
            );
          }
          return this.companyProfileService.registerCompanyProfile(profile, req.user.id);
        })
      );
    }

  @UseGuards(JwtGuard,IsCreatorGuard)
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  @Post('dashboard/company/upload_image')
  @HttpCode(HttpStatus.OK)
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req): Observable<{modifiedFileName: string } | { error: string }> {
    const fileName = file?.filename;

    if (!fileName) return of({ error: 'File must be a png, jpg/jpeg' });

    const imagesFolderPath = join(process.cwd(), 'images');
    const fullImagePath = join(imagesFolderPath + '/' + file.filename);
    const user_id = req.user.id;
    return this.companyProfileService.updateUserImageById(user_id, fileName).pipe(
      map(() => ({
        modifiedFileName: file.filename,
      })),
    );
  }
  @UseGuards(JwtGuard)
  @Get('companies')
  getAllProfiles() {
    return this.companyProfileService.getAllCompanyProfiles();
  }
}

