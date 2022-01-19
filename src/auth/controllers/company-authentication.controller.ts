import { Body, Controller, Post } from '@nestjs/common';
import { CompanyPosted } from 'src/auth/models/user.interface';
import { AuthService } from 'src/auth/services/auth.service';
import { Observable } from 'rxjs';

@Controller('dashboard/registration')
export class CompanyAuthenticationController {
    constructor(private companyAuthService: AuthService) {}

    @Post()
    create(@Body() companyAccount: CompanyPosted): Observable<CompanyPosted>{
        return this.companyAuthService.createCompanyAccount(companyAccount)
    }
}
