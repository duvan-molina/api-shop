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

@ObjectType("Order")
@Entity()
export class Order extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Boolean)
  @Column()
  isinvited!: boolean;

  @Field(() => String)
  @Column()
  status!: string;

  @Field(() => String)
  @Column()
  productName!: string;

  @Field(() => String)
  @Column()
  productImage!: string;

  @Field(() => Number)
  @Column()
  quantity!: number;

  @Field(() => Number)
  @Column()
  delivery!: number;

  @Field(() => Number)
  @Column()
  subtotal!: number;

  @Field(() => Number)
  @Column()
  total!: number;

  @Field(() => String, { nullable: true })
  @Column()
  firstname!: string;

  @Field(() => String, { nullable: true })
  @Column()
  lastname!: string;

  @Field(() => String, { nullable: true })
  @Column()
  email!: string;

  @Field(() => String, { nullable: true })
  @Column()
  address!: string;

  @Field(() => String, { nullable: true })
  @Column()
  city!: string;

  @Field(() => String, { nullable: true })
  @Column()
  phoneNumber!: string;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp" })
  creation_date!: string;
}
