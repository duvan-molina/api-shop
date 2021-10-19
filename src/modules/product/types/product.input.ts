import { InputType, Field } from "type-graphql";

@InputType()
export default class ProductInputType {
  @Field()
  title!: string;

  @Field(() => String, { nullable: true })
  imagen!: string;

  @Field((type) => String, { nullable: true })
  description!: string;

  @Field(() => Number, { defaultValue: 0 })
  ratings!: number;
}
