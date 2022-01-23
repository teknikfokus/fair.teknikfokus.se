import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('reset_passwords')
export class ForgottenPasswordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: String;

  @Column()
  new_password_token: String;

  @Column()
  timestamp: Date;
}
