import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/auth/models/user.interface';
import { AuthService } from 'src/auth/services/auth.service';
import { Observable } from 'rxjs';

@Controller('dashboard')
export class CompanyAuthenticationController {
    constructor(private companyAuthService: AuthService) {}

    @Post('registration')
    create(@Body() companyAccount: User): Observable<User>{
        
        return this.companyAuthService.registerCompanyAccount(companyAccount)
    }
}
