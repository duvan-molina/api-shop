import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Product } from "./Product";

@ObjectType("Variant")
@Entity()
export class Variant extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column()
  key!: string;

  @Field(() => String)
  @Column()
  value!: string;

  @Field(() => Number)
  @Column()
  price!: number;

  @ManyToOne(() => Product, (product) => product.variants)
  product!: Product;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp" })
  creation_date!: string;
}
