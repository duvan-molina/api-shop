import Fuse from "fuse.js";
import { take } from "lodash";

export const filterItems = (
  items?: any,
  limit: number = 10,
  offset: number = 0,
  text?: string,
  prominent?: boolean,
  category?: string
): any => {
  // @ts-ignore
  let filteredItems = items.sort((a, b) => b.creation_date - a.creation_date);

  // Text filter
  const fuse = new Fuse(items, {
    threshold: 0.3,
    minMatchCharLength: 2,
    keys: ["title"],
  });

  if (text && text !== "") {
    filteredItems = fuse.search(text);
  }
  // prominent
  if (prominent) {
    filteredItems = filteredItems.filter((item: any) => item.prominent);
  }

  // Category filter
  if (category && category.split(",").length) {
    filteredItems = filteredItems.filter((item: any) => {
      const isAvailable = item.categories.find((cat: any) =>
        category.split(",").includes(`${cat.slug}`)
      );
      if (isAvailable) {
        return true;
      }
      return false;
    });
  }
  const hasMore = offset + limit < filteredItems.length;

  filteredItems = filteredItems.slice(offset, offset + limit);
  return { items: filteredItems, hasMore };
};

export const filterOrder = async (items?: any, text?: string): Promise<any> => {
  // @ts-ignore
  let filteredItems = items.sort((a, b) => b.date - a.date);

  // Text filter
  const fuse = new Fuse(items, {
    keys: ["id", "products.title"],
  });

  if (text && text !== "") {
    filteredItems = fuse.search(text);
  }

  return await filteredItems;
};

export const getRelatedItems = async (
  type?: string,
  slug?: string,
  items?: any
): Promise<any> => {
  let filteredItems = items;
  const findRelated = take(
    await filteredItems.filter(
      (item: any) => item.type === type && item.slug !== slug
    ),
    10
  );
  return findRelated;
};
