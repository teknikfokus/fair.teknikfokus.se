import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User } from 'src/auth/models/user.interface';
import { AuthService } from 'src/auth/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('dashboard')
export class CompanyAuthenticationController {
    constructor(private companyAuthService: AuthService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    login(@Body() user: User): Observable<{ token: string }> {
      return this.companyAuthService
        .login(user)
        .pipe(map((jwt: string) => ({ token: jwt })));
    }
    
    @Post('registration')
    create(@Body() companyAccount: User): Observable<User>{
        
        return this.companyAuthService.registerCompanyAccount(companyAccount)
    }



}
