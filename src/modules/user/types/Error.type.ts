import { Field, ObjectType } from "type-graphql";

@ObjectType("ErrorType")
export default class ErrorType {
  @Field()
  path!: string;

  @Field()
  message!: string;
}
