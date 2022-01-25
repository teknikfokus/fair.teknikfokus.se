import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('registered_companies')
export class CompanyUserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    company_id: number;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

}