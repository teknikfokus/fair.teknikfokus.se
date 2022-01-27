import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('student_profiles')
export class StudentProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    programme: string;

    @Column({ default: 'default.jpg' })
    image_path: string;

    @Column()
    graduation_year: string;

}