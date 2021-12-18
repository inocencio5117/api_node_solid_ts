import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ICategoryRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepositories")
    private categoriesRepositories: ICategoryRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlredyExists = await this.categoriesRepositories.findByName(
      name
    );

    if (categoryAlredyExists) {
      throw new AppError(`Category ${name} already exists`);
    }

    this.categoriesRepositories.create({ name, description });
  }
}

export { CreateCategoryUseCase };
