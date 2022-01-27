import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { StudentUser } from 'src/auth/models/student_user.interface';
import { StudentAuthService } from 'src/auth/services/student_auth.service';
import { StudentProfile } from '../models/student_profile.interface';
import { StudentProfileService } from '../services/student-profile.service';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private studentAuthService: StudentAuthService,
    private studentProfileService: StudentProfileService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params }: { user: StudentUser; params: { id: number } } = request;

    if (!user || !params) return false;

    //if (user.role === 'admin') return true; // allow admins to get make requests

    const user_id = user.id;
    // Determine if logged-in user is the same as the user that created the feed post
    return this.studentAuthService.findStudentUserById(user_id).pipe(
      switchMap((student_user: StudentUser) =>
        this.studentProfileService.findProfileById(student_user.student_profile_id).pipe(
          map((student_profile: StudentProfile) => {
            let isAuthor = student_user.student_profile_id === student_profile.id && student_user.student_profile_id !== null;
            return isAuthor;
          }),
        ),
      ),
    );
  }
}