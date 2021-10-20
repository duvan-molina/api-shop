import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export default class SubcategoryType {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;
}
