import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map,Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { StudentProfileEntity } from '../models/student_profile.entity';
import { StudentProfile } from '../models/student_profile.interface';
import { StudentAuthService } from 'src/auth/services/student_auth.service';
import { join } from 'path';
import { removeFile } from 'src/helpers/image-storage';

@Injectable()
export class StudentProfileService {

  constructor(
    private studentAuthService: StudentAuthService,
    @InjectRepository(StudentProfileEntity)
    private readonly studentProfileRepository: Repository<StudentProfileEntity>
  ) {}

  registerStudentProfile(profile: StudentProfile, user_id: number): Observable<StudentProfile> {
    const { name, programme, graduation_year, linkedin_url } = profile;
    return from(
      this.studentProfileRepository.save({
        name,
        programme,
        graduation_year,
        linkedin_url,
      }),
    ).pipe(
      map((profile: StudentProfile) => {
        this.studentAuthService.updateStudentProfileById(user_id, profile.id);
        return profile;
      }),
    );
  }
  
  editStudentProfile(newdata: StudentProfile,profileId: number): Observable<StudentProfile> {
    return from(this.findProfileById(profileId)).pipe(
      map((profile: StudentProfile) => {
        const imagesFolderPath = join(process.cwd(), 'images');
        const fullImagePath = join(imagesFolderPath + '/' + profile.image_path);
        if(profile.image_path !== 'default_student.png'){
          removeFile(fullImagePath);
        }
        newdata.image_path = profile.image_path;
        from(this.studentProfileRepository.update(profile.id,newdata));
        return newdata;
      }),
    );
  }
  
  findProfileById(id: number): Observable<StudentProfile> {
    return from(
      this.studentProfileRepository.findOne({ id }),
    ).pipe(
      map((profile: StudentProfile) => {
        if (!profile) {
          throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        return profile;
      }),
    );
  }

  updateUserImageById(id: number, image_path: string): Observable<StudentProfile> {
    return from(
      this.studentProfileRepository.findOne({ id }),
    ).pipe(
      map((profile: StudentProfile) => {
        const imagesFolderPath = join(process.cwd(), 'images');
        const fullImagePath = join(imagesFolderPath + '/' + profile.image_path);
        if(profile.image_path !== 'default.jpg'){
          removeFile(fullImagePath);
        }
        profile.id = id;
        profile.image_path = image_path;
        from(this.studentProfileRepository.update(id, profile));
        return profile;
      }),
    );
  }

  updateUserCVById(id: number, cv_path: string): Observable<StudentProfile> {
    return from(
      this.studentProfileRepository.findOne({ id }),
    ).pipe(
      map((profile: StudentProfile) => {
        const folderPathPDF = join(process.cwd(), 'resumes');
        const fullPDFPath = join(folderPathPDF + '/' + profile.cv_path);
        if(profile.image_path !== null){
          removeFile(fullPDFPath);
        }
        profile.id = id;
        profile.cv_path = cv_path;
        from(this.studentProfileRepository.update(id, profile));
        return profile;
      }),
    );
  }

  getProfile(id: number): Observable<StudentProfile> {
    return from(
      this.studentProfileRepository.findOne({ id }),
    ).pipe(
      map((profile: StudentProfile) => {
        if (!profile) {
          throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }
        return profile;
      }),
    );
  }
    
  getAllStudentProfiles(): Promise<StudentProfileEntity[]> {
    return this.studentProfileRepository.find(
      {
        select: ['name', 'image_path'],
      },
    );
  }
}
