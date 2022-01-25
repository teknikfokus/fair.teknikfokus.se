import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CompanyUser } from 'src/auth/models/company_user.interface';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { CompanyProfile } from '../models/company_profile.interface';
import { CompanyProfileService } from '../services/company-profile.service';

@Injectable()
export class IsCreatorGuard implements CanActivate {
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

    const user_id = user.company_id;
    const profile_id = params.id;

    // Determine if logged-in user is the same as the user that created the feed post
    return this.userService.findUserById(user_id).pipe(
      switchMap((company_user: CompanyUser) =>
        this.companyProfileService.findUserById(profile_id).pipe(
          map((company_profile: CompanyProfile) => {
            let isAuthor = company_user.company_id === company_profile.id;
            return isAuthor;
          }),
        ),
      ),
    );
  }
}