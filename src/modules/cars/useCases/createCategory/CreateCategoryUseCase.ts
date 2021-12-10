import { ICategoryRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepositories: ICategoryRepository) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlredyExists = await this.categoriesRepositories.findByName(
      name
    );

    if (categoryAlredyExists) {
      throw new Error(`Category ${name} already exists`);
    }

    this.categoriesRepositories.create({ name, description });
  }
}

export { CreateCategoryUseCase };
