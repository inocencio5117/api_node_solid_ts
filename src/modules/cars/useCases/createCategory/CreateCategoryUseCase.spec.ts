import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesReporitoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesReporyInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    categoriesReporyInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesReporyInMemory);
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "category test",
      description: "test description",
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesReporyInMemory.findByName(
      category.name
    );

    console.log(categoryCreated);

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should be able to create a new category  with the same name", async () => {
    expect(async () => {
      const category = {
        name: "category test",
        description: "test description",
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
