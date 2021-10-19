import { ObjectType, Field, ID } from "type-graphql";
import VariantType from "../../shared/types/variant.type";

@ObjectType("ProductType")
export default class ProductType {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field(() => String, { nullable: true })
  imagen!: string;

  @Field((type) => String)
  description!: string;

  @Field((type) => Number)
  ratings!: number;

  @Field(() => [VariantType], { nullable: true })
  variants!: VariantType[];

  @Field(() => Date)
  creation_date!: string;
}