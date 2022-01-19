import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('registered_companies')
export class CompanyPostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    email: string;

    @Column({default: ''})
    company_name: string;

    @Column({default: ''})
    password: string;

    @Column({default: ''})
    information: string;

}