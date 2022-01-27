import { Test, TestingModule } from '@nestjs/testing';
import { StudentProfileService } from './student-profile.service';

describe('CompanyProfileService', () => {
  let service: StudentProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentProfileService],
    }).compile();

    service = module.get<StudentProfileService>(StudentProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
