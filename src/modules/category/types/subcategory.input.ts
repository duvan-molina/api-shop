import { Field, InputType } from "type-graphql";

@InputType()
export default class SubcategoryInput {
  @Field(() => String)
  title!: string;
}
