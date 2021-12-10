import { CategoryRepositories } from "../../repositories/implementations/CategoryRepositories";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CreateCategoryController } from "./CreateCategoryController";

export default (): CreateCategoryController => {
  const categoryRepositories = new CategoryRepositories();

  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepositories);

  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );

  return createCategoryController;
};
