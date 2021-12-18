import { container } from "tsyringe";
import { ICategoryRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoryRepositories } from "../../modules/cars/repositories/implementations/CategoryRepositories";
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepositories",
  CategoryRepositories
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
