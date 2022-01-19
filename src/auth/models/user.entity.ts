import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('registered_companies')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    company_id: number;

    @Column({unique:true})
    email: string;

    @Column({ select: false })
    password: string;


}