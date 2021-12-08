import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { CategoryRepositories } from "../../repositories/implementations/CategoryRepositories";

const categoryRepositories = CategoryRepositories.getInstance();

const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepositories);

const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);

export { listCategoriesController };
