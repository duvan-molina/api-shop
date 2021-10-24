import { ObjectType, Field, ID } from "type-graphql";
import PaginatedResponse from "../../../utilis/helpers/paginated-response";
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

  @Field(() => [VariantType], { nullable: true })
  variants!: VariantType[];

  @Field(() => Date)
  creation_date!: string;
}

@ObjectType()
export class ProductResponse extends PaginatedResponse(ProductType) {
  // simple helper for creating new instances easily
  constructor(productResponse: ProductResponse) {
    super();
    Object.assign(this, productResponse);
  }
}
