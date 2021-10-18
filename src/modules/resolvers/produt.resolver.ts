import { Arg, Query, Resolver } from "type-graphql";
import { Product } from "../../entity/Product";
import ProductType from "../types/product.type";

@Resolver()
export class ProductResolver {
  @Query(() => [ProductType])
  async products(): Promise<ProductType[] | undefined> {
    const response = await Product.find();

    return response;
  }

  @Query(() => ProductType)
  async product(
    @Arg("productId") id: string
  ): Promise<ProductType | undefined> {
    return await Product.findOne(id);
  }
}
