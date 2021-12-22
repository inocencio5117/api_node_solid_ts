import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CategoryRepositories } from "@modules/cars/infra/typeorm/repositories/CategoryRepositories";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { container } from "tsyringe";

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
