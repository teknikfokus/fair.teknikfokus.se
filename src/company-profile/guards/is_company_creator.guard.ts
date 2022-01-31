import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CompanyUser } from 'src/auth/models/company_user.interface';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { CompanyProfile } from '../models/company_profile.interface';
import { CompanyProfileService } from '../services/company-profile.service';

@Injectable()
export class IsCompanyCreatorGuard implements CanActivate {
  constructor(
    private userService: CompanyAuthService,
    private companyProfileService: CompanyProfileService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params }: { user: CompanyUser; params: { id: number } } = request;

    if (!user || !params) return false;

    //if (user.role === 'admin') return true; // allow admins to get make requests

    const user_id = user.id;
    // Determine if logged-in user is the same as the user that created the feed post
    return this.userService.findUserById(user_id).pipe(
      switchMap((company_user: CompanyUser) =>
        this.companyProfileService.findProfileById(company_user.company_profile_id).pipe(
          map((company_profile: CompanyProfile) => {
            let isAuthor = company_user.company_profile_id === company_profile.id && company_user.company_profile_id !== null;
            return isAuthor;
          }),
        ),
      ),
    );
  }
}