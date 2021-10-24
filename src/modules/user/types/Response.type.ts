import { Field, ObjectType } from "type-graphql";
import ErrorType from "./Error.type";
import UserType from "./User.type";



@ObjectType()
export default class ResponseType {
  @Field(() => Boolean)
  success!: boolean;

  @Field({ nullable: true })
  token?: string;

  @Field(() => [ErrorType])
  errors!: ErrorType[];

  @Field(() => UserType, { nullable: true })
  user?: UserType;
}
