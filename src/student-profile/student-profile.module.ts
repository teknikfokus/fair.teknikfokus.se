import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from 'src/auth/authentication.module';
import { StudentAuthController } from 'src/auth/controllers/student_auth.controller';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtStrategy } from 'src/auth/guards/jwt.strategy';
import { ForgottenPasswordEntity } from 'src/auth/models/forgotten_password.entity';
import { StudentUserEntity } from 'src/auth/models/student_user.entity';
import { StudentAuthService } from 'src/auth/services/student_auth.service';
import { MailModule } from 'src/mail/mail.module';
import { StudentProfileController } from './controllers/student_profile.controller';
import { IsCreatorGuard } from './guards/is-creator.guard';
import { StudentProfileEntity } from './models/student_profile.entity';
import { StudentProfileService } from './services/student-profile.service';


@Module({
  imports: [AuthenticationModule, JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  }),
  TypeOrmModule.forFeature([StudentProfileEntity, StudentUserEntity, ForgottenPasswordEntity]),
  MailModule],
  controllers: [StudentAuthController, StudentProfileController],
  providers: [StudentAuthService, StudentProfileService, IsCreatorGuard, JwtGuard, JwtStrategy]
})
export class StudentProfileModule {}
