import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CompanyUser } from 'src/auth/models/company_user.interface';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CompanyProfileService } from 'src/company-profile/services/company-profile.service';
import { CompanyProfile } from 'src/company-profile/models/company_profile.interface';

@Controller('dashboard')
export class CompanyAuthController {
    constructor(
      private companyAuthService: CompanyAuthService,
      private companyProfileService: CompanyProfileService,
      ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    login(@Body() user: CompanyUser): Observable<{ token: string, company_slug: string }> {
      const { email, password } = user;
      return this.companyAuthService
        .validateUser(email, password).pipe(
          switchMap((user: CompanyUser) => {
            return from(this.companyProfileService.findProfileById(user.company_id)).pipe(
              switchMap((company: CompanyProfile) => {
                return this.companyAuthService.login(user)
                .pipe(map((jwt: string) => ({ 
                  token: jwt,
                  company_slug: company.slug_name,
                })));
              })
            )
          })
        )
        
    }

    @Post('registration')
    create(@Body() companyAccount: CompanyUser): Observable<CompanyUser>{
        
        return this.companyAuthService.registerCompanyAccount(companyAccount)
    }



}
