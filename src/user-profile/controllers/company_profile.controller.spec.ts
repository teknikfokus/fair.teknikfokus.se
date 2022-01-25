import { Test, TestingModule } from '@nestjs/testing';
import { CompanyProfileController } from './company_profile.controller';

describe('CompanyProfileController', () => {
  let controller: CompanyProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyProfileController],
    }).compile();

    controller = module.get<CompanyProfileController>(CompanyProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
