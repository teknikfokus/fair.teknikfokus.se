import { Test, TestingModule } from '@nestjs/testing';
import { CompanyAuthService } from '../../../src/auth/services/company_auth.service';

describe('CompanyAuthenticationService', () => {
  let service: CompanyAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyAuthService],
    }).compile();

    service = module.get<CompanyAuthService>(CompanyAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
