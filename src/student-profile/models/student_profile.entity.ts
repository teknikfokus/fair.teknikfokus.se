import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('student_profiles')
export class StudentProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    programme: string;

    @Column({ default: 'default_student.png' })
    image_path: string;

    @Column({nullable: true})
    cv_path: string;

    @Column({nullable: true})
    linkedin_url: string;

    @Column()
    graduation_year: string;

}