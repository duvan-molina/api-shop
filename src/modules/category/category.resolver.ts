import { Query, Resolver } from "type-graphql";
import { Category } from "../../entity/Category";
import CategoryType from "./types/category.type";

@Resolver()
export class CategoryResolver {
  @Query(() => [CategoryType])
  async getCategories(): Promise<CategoryType[] | []> {
    const response = await Category.find();
    if (response) {
      return response;
    }
    return [];
  }
}
