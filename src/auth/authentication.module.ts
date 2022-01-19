import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CompanyAuthenticationController } from './controllers/company-authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService],
  controllers: [CompanyAuthenticationController]
})
export class AuthenticationModule {}
