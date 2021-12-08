import { ICategoryRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepositories: ICategoryRepository) {

  }
  execute({name, description}: IRequest) {
    const categoryAlredyExists = this.categoriesRepositories.findByName(name);
  
    if (categoryAlredyExists) {
      throw new Error(`Category ${name} already exists`)
    }
  
    this.categoriesRepositories.create({ name, description });

  }
}

export { CreateCategoryUseCase }