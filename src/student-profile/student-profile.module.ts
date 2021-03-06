import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from 'src/auth/authentication.module';
import { StudentAuthController } from 'src/auth/controllers/student_auth.controller';
import { IsStudentGuard } from 'src/auth/guards/is-student.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtStrategy } from 'src/auth/guards/jwt.strategy';
import { CompanyUserEntity } from 'src/auth/models/company_user.entity';
import { ForgottenPasswordEntity } from 'src/auth/models/forgotten_password.entity';
import { StudentUserEntity } from 'src/auth/models/student_user.entity';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { StudentAuthService } from 'src/auth/services/student_auth.service';
import { FairDayGuard } from 'src/company-profile/guards/fair_day.guard';
import { CompanyProfileEntity } from 'src/company-profile/models/company_profile.entity';
import { JobEntity } from 'src/company-profile/models/job.entity';
import { CompanyProfileService } from 'src/company-profile/services/company-profile.service';
import { MailModule } from 'src/mail/mail.module';
import { StudentProfileController } from './controllers/student_profile.controller';
import { IsStudentCreatorGuard } from './guards/is_student_creator.guard';
import { StudentProfileEntity } from './models/student_profile.entity';
import { StudentProfileService } from './services/student-profile.service';


@Module({
  imports: [AuthenticationModule, JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '43200s' },
    }),
  }),
  TypeOrmModule.forFeature([StudentProfileEntity, StudentUserEntity, 
    CompanyUserEntity, JobEntity, CompanyProfileEntity, ForgottenPasswordEntity])
    ,MailModule],
  controllers: [StudentAuthController, StudentProfileController],
  providers: [StudentAuthService, StudentProfileService, CompanyAuthService, 
    CompanyProfileService, IsStudentGuard, IsStudentCreatorGuard, JwtGuard, JwtStrategy, FairDayGuard]
})
export class StudentProfileModule {}
