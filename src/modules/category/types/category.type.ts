import { Field, ObjectType } from "type-graphql";
import SubcategoryType from "./subcategory.type";

@ObjectType()
export default class CategoryType {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description!: string;

  @Field(() => [SubcategoryType], { nullable: true })
  subcategories!: SubcategoryType[];

  @Field(() => String, { nullable: true })
  imagen!: string;
}
