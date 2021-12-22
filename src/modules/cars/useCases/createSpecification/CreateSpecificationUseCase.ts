import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationsRepository: SpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlredyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlredyExists) {
      throw new AppError(`Specification ${name} already exists`);
    }

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
