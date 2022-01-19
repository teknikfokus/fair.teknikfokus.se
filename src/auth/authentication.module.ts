import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CompanyAuthenticationController } from './controllers/company-authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyPostEntity } from './models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyPostEntity])],
  providers: [AuthService],
  controllers: [CompanyAuthenticationController]
})
export class AuthenticationModule {}
