import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('registered_companies')
export class CompanyPostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    email: string;

    @Column({default: ''})
    company_name: string;

    @Column({default: ''})
    password: string;

    @Column({default: ''})
    information: string;

}