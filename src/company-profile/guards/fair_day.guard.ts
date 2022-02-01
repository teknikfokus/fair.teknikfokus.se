import { CanActivate, ExecutionContext, Injectable, Logger} from '@nestjs/common';
import { from, map, Observable, switchMap } from 'rxjs';
import { CompanyUser } from 'src/auth/models/company_user.interface';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { CompanyProfile } from '../models/company_profile.interface';
import { CompanyProfileService } from '../services/company-profile.service';

@Injectable()
export class FairDayGuard implements CanActivate {
  constructor(
    private companyAuthService: CompanyAuthService,
    private companyProfileService: CompanyProfileService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let today = new Date().toISOString().slice(0, 10)
    const request = context.switchToHttp().getRequest();
    const { user, params }: { user: CompanyUser; params: { id: number } } = request;
    return from(this.companyAuthService.findUserById(user.id)).pipe(
      switchMap((user: CompanyUser) => {
        return from(this.companyProfileService.findProfileById(user.company_profile_id)).pipe(
          map((profile: CompanyProfile) => {
            if(profile.slug_name == 'Teknikfokus') {
              return true;
            }
            if (profile.fair_day == 1) {
              return today == '2022-02-16';
            }
            if (profile.fair_day == 2) {
              return today == '2022-02-17';
            } 
            if (profile.fair_day == 3) {
              return today == '2022-02-16' || today == '2022-02-17';
            }
            return false;
          }),
        ); 
      }),
    );
  }
}