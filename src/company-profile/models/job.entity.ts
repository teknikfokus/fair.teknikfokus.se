import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('jobs')
export class JobEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    company_id: number;

    @Column()
    job_position: string;

    @Column()
    job_description: string;

}