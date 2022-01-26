import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CompanyUser } from 'src/auth/models/company_user.interface';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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



}
