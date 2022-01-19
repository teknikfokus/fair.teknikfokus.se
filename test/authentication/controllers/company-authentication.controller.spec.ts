import { Test, TestingModule } from '@nestjs/testing';
import { CompanyAuthenticationController } from '../../../src/auth/controllers/company-authentication.controller';

describe('CompanyAuthenticationController', () => {
  let controller: CompanyAuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyAuthenticationController],
    }).compile();

    controller = module.get<CompanyAuthenticationController>(CompanyAuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
