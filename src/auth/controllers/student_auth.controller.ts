import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { StudentUser } from 'src/auth/models/student_user.interface';
import { StudentAuthService } from 'src/auth/services/student_auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ForgottenPassword } from '../models/forgottenpassword.interface';

@Controller()
export class StudentAuthController {
    constructor(
        private studentAuthService: StudentAuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user: StudentUser): Observable<{ token: string }> {
      return this.studentAuthService
        .login(user)
        .pipe(map((jwt: string) => ({ token: jwt })));
    }

    @Post('register')
    create(@Body() studentAccount: StudentUser): Observable<StudentUser>{
        
        return this.studentAuthService.registerStudentAccount(studentAccount)
    }

    @Post('forgotpassword')
    newpassword(@Body() forgottenPassword: ForgottenPassword): Observable<ForgottenPassword>{
        return this.studentAuthService.createForgottenPasswordToken(forgottenPassword)
    }
    

}