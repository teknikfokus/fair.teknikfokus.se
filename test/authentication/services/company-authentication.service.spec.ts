import { Test, TestingModule } from '@nestjs/testing';
import { CompanyAuthenticationService } from '../../../src/authentication/services/company-authentication.service';

describe('CompanyAuthenticationService', () => {
  let service: CompanyAuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyAuthenticationService],
    }).compile();

    service = module.get<CompanyAuthenticationService>(CompanyAuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
