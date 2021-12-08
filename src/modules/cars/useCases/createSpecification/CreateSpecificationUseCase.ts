import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: SpecificationRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationAlredyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlredyExists)
      throw new Error(`Specification ${name} already exists`);

    this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
