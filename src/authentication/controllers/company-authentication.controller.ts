import { Body, Controller, Post } from '@nestjs/common';
import { CompanyPosted } from 'src/authentication/models/post.interface';
import { CompanyAuthenticationService } from 'src/authentication/services/company-authentication.service';
import { Observable } from 'rxjs';

@Controller('company-authentication')
export class CompanyAuthenticationController {
    constructor(private companyAuthService: CompanyAuthenticationService) {}

    @Post()
    create(@Body() companyAccount: CompanyPosted): Observable<CompanyPosted>{
        return this.companyAuthService.createCompanyAccount(companyAccount)
    }
}
