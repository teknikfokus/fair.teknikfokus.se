import { Body, Controller, HttpCode, HttpStatus, Post, Put, UseGuards, Request, HttpException, Logger } from '@nestjs/common';
import { CompanyUser } from 'src/auth/models/company_user.interface';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IsCompanyGuard } from '../guards/is-company.guard';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('dashboard')
export class CompanyAuthController {
  constructor(private companyAuthService: CompanyAuthService) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  login(@Body() user: CompanyUser): Observable<{ token: string }> {
    return this.companyAuthService
    .login(user)
    .pipe(map((jwt: string) => ({ token: jwt })));
  }

  @Post('registration')
  create(@Body() companyAccount: CompanyUser): Observable<CompanyUser>{
    return this.companyAuthService.registerCompanyAccount(companyAccount)
  }

  @UseGuards(JwtGuard, IsCompanyGuard)
  @Post('resetpassword')
  changePassword(@Body() passwords, @Request() req) {
    return this.companyAuthService.validateUser(req.user.email, passwords.oldPassword).pipe(
      switchMap((user: CompanyUser) => {
        if (!user) {
          throw new HttpException(
            { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
            HttpStatus.FORBIDDEN,
          );
        }
        return from(this.companyAuthService.passwordReset(user.id, passwords.newPassword));
      }),
    );
  }
}
