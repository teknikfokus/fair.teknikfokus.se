import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('company_profiles')
export class CompanyProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    company_name: string;

    @Column()
    company_information: string;

    @Column({ nullable: true })
    image_path: string;

    @Column()
    meeting_link: string;

    @Column({default: false})
    summer_internship: boolean;

    @Column({default: false})
    master_thesis: boolean;

    @Column({default: false})
    trainee_programme: boolean;

}