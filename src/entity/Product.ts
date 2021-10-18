import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType("Product")
@Entity()
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => String)
  @Column({ nullable: true })
  imagen!: string;

  @Field(() => String)
  @Column()
  description!: string;

  @Field(() => Number)
  @Column({ default: 0 })
  ratings!: number;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp" })
  creation_date!: string;
}
