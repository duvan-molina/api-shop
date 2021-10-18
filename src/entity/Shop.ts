import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType("Shop")
@Entity()
export class Shop extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => String)
  @Column({ nullable: true })
  logotipo!: string;

  @Field(() => String)
  @Column()
  description!: string;
}
