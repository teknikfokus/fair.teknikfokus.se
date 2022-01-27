import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('reset_passwords')
export class ForgottenPasswordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: String;

  @Column({ unique: true })
  token_link: String;

  @Column()
  timestamp: Date;
}
