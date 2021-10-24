import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class UserType {
  @Field(() => String)
  firstname!: string;

  @Field(() => String)
  lastname!: string;

  @Field(() => String)
  email!: string;
}
