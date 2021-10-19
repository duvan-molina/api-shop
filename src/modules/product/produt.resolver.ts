import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Product } from "../../entity/Product";
import ProductInputType from "./types/product.input";
import ProductType from "./types/product.type";

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

  @Mutation(() => ProductType)
  async createProduct(
    @Arg("product") product: ProductInputType
  ): Promise<ProductType | undefined> {
    const response = await Product.create({
      title: product.title,
      description: product.description,
      imagen: product.imagen,
      ratings: product.ratings,
    }).save();
    return response;
  }

  @Mutation(() => String, { description: "delete product" })
  async deleteProduct(@Arg("productId") productId: string): Promise<String> {
    const res = await Product.delete(productId);
    if (res.affected !== 0) {
      return productId;
    } else {
      return "Wrong something bad";
    }
  }
}
