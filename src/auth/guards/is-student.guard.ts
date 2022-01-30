import { CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CompanyUser } from 'src/auth/models/company_user.interface';

@Injectable()
export class IsStudentGuard implements CanActivate {
  constructor(
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params }: { user: CompanyUser; params: { id: number } } = request;

    if (!user || !params || request.user.type != 'student') return false;

    return true;
  }
}
