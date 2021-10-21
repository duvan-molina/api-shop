import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Variant } from "./Variant";

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
  @Column({ default: 1 })
  quantity!: number;

  @Field(() => Number)
  @Column({ default: 0 })
  ratings!: number;

  @OneToMany(() => Variant, (variant) => variant.product)
  variants!: Variant[];

  @Field(() => Number)
  @Column()
  price!: number;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp" })
  creation_date!: string;
}
