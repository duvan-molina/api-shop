import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class CategoryType {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description!: string;

  @Field(() => String, { nullable: true })
  imagen!: string;
}
