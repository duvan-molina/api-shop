import { ObjectType, Field, ID } from "type-graphql";

@ObjectType("ProductType")
export default class ProductType {
  @Field((type) => ID)
  id!: string;

  @Field()
  title!: string;

  @Field(() => String)
  imagen!: string;

  @Field((type) => String)
  description!: string;

  @Field((type) => Number)
  ratings!: number;

  @Field(() => String)
  creation_date!: string;
}
