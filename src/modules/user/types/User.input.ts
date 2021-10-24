import { Field, InputType } from "type-graphql";

@InputType()
export default class CreateUser {
  @Field(() => String)
  firstname!: string;

  @Field(() => String)
  lastname!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}
