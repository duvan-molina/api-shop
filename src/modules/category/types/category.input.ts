import { Field, InputType } from "type-graphql";

@InputType()
export default class CategoryInput {
  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  imagen!: string;

  @Field(() => String, { nullable: true })
  description!: string;
}
