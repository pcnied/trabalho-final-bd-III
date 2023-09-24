import { randomUUID } from "crypto";
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { AnotationEntity } from "./anotation.entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ type: "varchar", length: 50 })
  name!: string;

  @Column({ unique: true, type: "varchar", length: 50 })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ name: "created_at" })
  createdAt!: Date;

  @OneToMany(() => AnotationEntity, (a) => a.user)
  anotations!: AnotationEntity[];

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
    this.createdAt = new Date();
  }
}
