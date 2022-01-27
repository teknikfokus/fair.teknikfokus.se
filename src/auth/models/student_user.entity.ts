import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('registered_students')
export class StudentUserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    student_id: number;

    @Column({unique:true})
    email: string;

    @Column({ select: false })
    password: string;

}