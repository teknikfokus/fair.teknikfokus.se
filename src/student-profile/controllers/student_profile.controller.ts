import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, UseInterceptors, Request, UploadedFile, HttpException, Put, Res} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { IsCompanyGuard } from 'src/auth/guards/is-company.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { StudentUser } from 'src/auth/models/student_user.interface';
import { StudentAuthService } from 'src/auth/services/student_auth.service';
import { FairDayGuard } from 'src/company-profile/guards/fair_day.guard';
import { IsStudentCreatorGuard } from '../guards/is_student_creator.guard';
import { saveImageToStorage } from 'src/helpers/image-storage';
import { StudentProfile } from '../models/student_profile.interface';
import { StudentProfileService } from '../services/student-profile.service';
import { saveCVToStorage } from 'src/helpers/pdf-storage';
import { IsStudentGuard } from 'src/auth/guards/is-student.guard';
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

  @UseGuards(JwtGuard,IsStudentCreatorGuard, IsStudentGuard)
  @Put('student/profile')
  @HttpCode(HttpStatus.OK)
  editstudentProfile(
    @Body() studentEdits: StudentProfile, @Request() req): Observable<StudentProfile> {
    return from(this.studentAuthService.findStudentUserById(req.user.id)).pipe(
      switchMap((user: StudentUser) => {
        return this.studentProfileService.editStudentProfile(user.student_profile_id, studentEdits);
      })
    );
  }

  @UseGuards(JwtGuard, IsStudentCreatorGuard, IsStudentGuard)
  @Get('student/profile')
  getMyProfile(@Request() req) {
    return from(this.studentAuthService.findStudentUserById(req.user.id)).pipe(
      switchMap((user: StudentUser) => {
        return this.studentProfileService.getProfile(user.student_profile_id);
      })
    );
  }

  @UseGuards(JwtGuard,IsStudentCreatorGuard, IsStudentGuard)
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
      }),
      );
    }
    
  @UseGuards(JwtGuard,IsStudentCreatorGuard, IsStudentGuard)
  @UseInterceptors(FileInterceptor('file', saveCVToStorage))
  @Post('student/upload_cv')
  @HttpCode(HttpStatus.OK)
  uploadCV(
    @UploadedFile() file: Express.Multer.File,
    @Request() req): Observable<{modifiedFileName: string } | { error: string }> {
    const fileName = file?.filename;

    if (!fileName) return of({ error: 'File must be a pdf.' });
  
    return from(this.studentAuthService.findStudentUserById(req.user.id)).pipe(
      switchMap((user: StudentUser) => {
        return this.studentProfileService.updateUserCVById(user.student_profile_id, fileName).pipe(
          map(() => ({
            modifiedFileName: file.filename,
          })),
        );
      }),
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


  @UseGuards()
  @Get('student/cv/:cv_filename')
  findCV(@Param() param, @Res() res): Observable<Object> {
    const cv_filename = param.cv_filename;
    return of(res.sendFile(cv_filename, { root: './resumes' }));
  }
}

