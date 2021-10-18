import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Subcategory } from "./Subcategory";

@ObjectType("Category")
@Entity()
export class Category extends BaseEntity {
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

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories!: Subcategory[];

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp" })
  creation_date!: string;
}
