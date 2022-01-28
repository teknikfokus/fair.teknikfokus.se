import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, UseInterceptors, Request, UploadedFile, HttpException, Put} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { IsCompanyGuard } from 'src/auth/guards/is-company.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { StudentUser } from 'src/auth/models/student_user.interface';
import { StudentAuthService } from 'src/auth/services/student_auth.service';
import { FairDayGuard } from 'src/company-profile/guards/fair_day.guard';
import { IsCreatorGuard } from '../guards/is-creator.guard';
import { saveImageToStorage } from 'src/helpers/image-storage';
import { StudentProfile } from '../models/student_profile.interface';
import { StudentProfileService } from '../services/student-profile.service';
@Controller()
export class StudentProfileController {

  constructor(
    private studentProfileService: StudentProfileService,
    private studentAuthService: StudentAuthService
  ) {}

  @UseGuards(JwtGuard)
  @Post('student/profile')
  @HttpCode(HttpStatus.OK)
  registerstudentProfile(@Body() profile: StudentProfile, @Request() req): Observable<StudentUser> {
    return from(this.studentAuthService.findStudentUserById(req.user.id)).pipe(
      switchMap((user: StudentUser) => {
        if(user.student_profile_id != null) {
          throw new HttpException(
            { status: HttpStatus.FORBIDDEN, error: 'You have already created a profile.' },
            HttpStatus.FORBIDDEN,
          );
        }
        return this.studentProfileService.registerStudentProfile(profile, req.user.id);
      })
    );
  }

  @UseGuards(JwtGuard,IsCreatorGuard)
  @Put('student/profile')
  @HttpCode(HttpStatus.OK)
  editstudentProfile(
    @Body() studentEdits: StudentProfile, @Request() req): Observable<StudentProfile> {
    return from(this.studentAuthService.findStudentUserById(req.user.id)).pipe(
      switchMap((user: StudentUser) => {
        return this.studentProfileService.editStudentProfile(studentEdits, user.student_profile_id);
      })
    );
  }

  @UseGuards(JwtGuard,IsCreatorGuard)
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  @Post('student/upload_image')
  @HttpCode(HttpStatus.OK)
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req): Observable<{modifiedFileName: string } | { error: string }> {
    const fileName = file?.filename;

    if (!fileName) return of({ error: 'File must be a png, jpg/jpeg' });

    return from(this.studentAuthService.findStudentUserById(req.user.id)).pipe(
      switchMap((user: StudentUser) => {
        return this.studentProfileService.updateUserImageById(user.student_profile_id, fileName).pipe(
          map(() => ({
            modifiedFileName: file.filename,
          })),
        );
        }
      )
    );
  }

  @UseGuards(JwtGuard, IsCompanyGuard, FairDayGuard)
  @Get('students')
  getAllProfiles(@Request() req) {
    return this.studentProfileService.getAllStudentProfiles();
  }

  @UseGuards(JwtGuard, IsCompanyGuard)
  @Get('student/:id')
  getProfile(@Param() param) {
    return this.studentProfileService.getProfile(param.id);
  }
}

