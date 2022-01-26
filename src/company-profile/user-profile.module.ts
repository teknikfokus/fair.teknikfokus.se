import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from 'src/auth/authentication.module';
import { CompanyAuthController } from 'src/auth/controllers/company_auth.controller';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtStrategy } from 'src/auth/guards/jwt.strategy';
import { CompanyUserEntity } from 'src/auth/models/company_user.entity';
import { CompanyAuthService } from 'src/auth/services/company_auth.service';
import { CompanyProfileController } from './controllers/company_profile.controller';
import { IsCreatorGuard } from './guards/is-creator.guard';
import { CompanyProfileEntity } from './models/company_profile.entity';
import { JobEntity } from './models/job.entity';
import { CompanyProfileService } from './services/company-profile.service';

@Module({
  imports: [AuthenticationModule, JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  }),
  TypeOrmModule.forFeature([CompanyProfileEntity, CompanyUserEntity, JobEntity])],
  controllers: [CompanyAuthController, CompanyProfileController],
  providers: [CompanyAuthService, CompanyProfileService, IsCreatorGuard, JwtGuard, JwtStrategy]
})
export class UserProfileModule {}
