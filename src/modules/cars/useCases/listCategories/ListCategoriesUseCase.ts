import { inject, injectable } from "tsyringe";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoryRepositories")
    private categoriesRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
