import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { CategoryRepositories } from "../../repositories/implementations/CategoryRepositories";

const categoryRepository = CategoryRepositories.getInstance();

const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);

const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export { importCategoryController };
