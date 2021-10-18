import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Category } from "./Category";

@ObjectType("Subcategory")
@Entity()
export class Subcategory extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column()
  title!: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  category!: Category;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp" })
  creation_date!: string;
}
