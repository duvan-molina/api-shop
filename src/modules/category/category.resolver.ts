import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Category } from "../../entity/Category";
import { Subcategory } from "../../entity/Subcategory";
import CategoryInput from "./types/category.input";
import CategoryType from "./types/category.type";
import SubcategoryInput from "./types/subcategory.input";
import SubcategoryType from "./types/subcategory.type";

@Resolver()
export class CategoryResolver {
  @Query(() => [CategoryType])
  async getCategories(): Promise<CategoryType[] | []> {
    const response = await Category.find({ relations: ["subcategories"] });
    if (response) {
      return response;
    }
    return [];
  }

  @Mutation(() => CategoryType)
  async createCategory(
    @Arg("category") category: CategoryInput
  ): Promise<CategoryType> {
    return await Category.create(category).save();
  }

  @Mutation(() => CategoryType)
  async editCategory(
    @Arg("categoryId") categoryId: string,
    @Arg("subcategoryId", { nullable: true }) subcategoryId: string,
    @Arg("fields", { nullable: true }) fields: CategoryInput
  ): Promise<CategoryType | undefined> {
    const category = await Category.findOne(categoryId);

    if (fields) {
      await getConnection()
        .createQueryBuilder()
        .update(Category)
        .set(fields)
        .where("id =:id", { id: categoryId })
        .execute();
    }

    if (subcategoryId) {
      await getConnection()
        .createQueryBuilder()
        .update(Subcategory)
        .set({ category })
        .where("id = :id", { id: subcategoryId })
        .execute();
    }
    return category;
  }

  // handle subcategory
  @Mutation(() => SubcategoryType)
  async createSubCategory(
    @Arg("category") category: SubcategoryInput
  ): Promise<SubcategoryType> {
    return await Subcategory.create(category).save();
  }
}
