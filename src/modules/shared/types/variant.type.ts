import { ObjectType, Field, ID } from "type-graphql";

@ObjectType("VariantType")
export default class VariantType {
  @Field((type) => ID)
  id!: string;

  @Field(() => String)
  key!: string;

  @Field(() => String)
  value!: string;

  @Field(() => Number)
  price!: number;

  @Field(() => String)
  creation_date!: string;
}
