import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType("Address")
@Entity()
export class Address extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column()
  address!: string;

  @Field(() => String)
  @Column()
  city!: string;

  @Field(() => String)
  @Column()
  description!: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user!: User;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp" })
  creation_date!: string;
}
