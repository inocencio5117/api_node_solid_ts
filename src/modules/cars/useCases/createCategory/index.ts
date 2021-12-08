import { CategoryRepositories } from "../../repositories/implementations/CategoryRepositories";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CreateCategoryController } from "./CreateCategoryController";

const categoryRepositories = CategoryRepositories.getInstance();

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepositories);

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);

export { createCategoryController };
