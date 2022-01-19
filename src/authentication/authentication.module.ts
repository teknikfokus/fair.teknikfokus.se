import { Module } from '@nestjs/common';
import { CompanyAuthenticationService } from './services/company-authentication.service';
import { CompanyAuthenticationController } from './controllers/company-authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyPostEntity } from './models/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyPostEntity])],
  providers: [CompanyAuthenticationService],
  controllers: [CompanyAuthenticationController]
})
export class AuthenticationModule {}
