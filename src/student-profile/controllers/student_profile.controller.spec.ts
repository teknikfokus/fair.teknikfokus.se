import { Test, TestingModule } from '@nestjs/testing';
import { StudentProfileController } from './student_profile.controller';

describe('CompanyProfileController', () => {
  let controller: StudentProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentProfileController],
    }).compile();

    controller = module.get<StudentProfileController>(StudentProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
