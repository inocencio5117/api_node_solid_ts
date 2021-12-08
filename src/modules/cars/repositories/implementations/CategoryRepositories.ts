import { Category } from "../../models/Category";
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoryRepositories implements ICategoryRepository {
  private categories: Category[];

  private static INSTANCE: CategoryRepositories;

  constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoryRepositories {
    if (!CategoryRepositories.INSTANCE) {
      CategoryRepositories.INSTANCE = new CategoryRepositories();
    }

    return CategoryRepositories.INSTANCE;
  }

  create({ description, name }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((c) => c.name === name);
    return category;
  }
}

export { CategoryRepositories };
