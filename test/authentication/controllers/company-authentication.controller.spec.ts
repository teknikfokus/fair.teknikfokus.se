import { Test, TestingModule } from '@nestjs/testing';
import { CompanyAuthController } from '../../../src/auth/controllers/company_auth.controller';

describe('CompanyAuthenticationController', () => {
  let controller: CompanyAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyAuthController],
    }).compile();

    controller = module.get<CompanyAuthController>(CompanyAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
