import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Product } from "../../entity/Product";
import { filterItems } from "../../utilis/helpers/filter";
import ProductInputType from "./types/product.input";
import ProductType, { ProductResponse } from "./types/product.type";

@Resolver()
export class ProductResolver {
  @Query(() => ProductResponse)
  async products(
    @Arg("limit", () => Int, { defaultValue: 10 }) limit: number,
    @Arg("offset", () => Int, { defaultValue: 0 }) offset: number,
    @Arg("text", { nullable: true }) text?: string
  ): Promise<ProductResponse> {
    const response = await Product.find();

    const filteredData = filterItems(response, limit, offset, text);

    if (text && text !== "") {
      return new ProductResponse({
        total: response.length,
        items: await filteredData.items.map((e: any) => e.item),
        hasMore: false,
      });
    }

    return new ProductResponse({
      total: response.length,
      ...filteredData,
    });
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
