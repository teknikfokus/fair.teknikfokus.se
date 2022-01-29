import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('company_profiles')
export class CompanyProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug_name: string;

    @Column()
    information: string;

    @Column({ default: 'default.jpg' })
    image_path: string;

    @Column()
    meeting_link: string;

    @Column({default: false})
    summer_internship: boolean;

    @Column({default: false})
    master_thesis: boolean;

    @Column({default: 0})
    fair_day: number;

    @Column({default: false})
    trainee_programme: boolean;

}