import { Query, Resolver } from "type-graphql";
import { Product } from "../../entity/Product";
import ProductType from "../types/product.type";

@Resolver()
export class ProductResolver {
  @Query(() => [ProductType])
  async products(): Promise<ProductType[] | null> {
    const response = await Product.find();

    return response;
  }
}
