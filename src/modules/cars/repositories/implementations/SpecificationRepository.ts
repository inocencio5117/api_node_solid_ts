import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from "../ISpecificationRepository";
import { Specification } from "../../models/Specification";

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }
  findByName(name: string) {
    const spec = this.specifications.find((spec) => spec.name === name);

    return spec;
  }

  create({ name, description }: ICreateSpecificationDTO) {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      createdAt: new Date(),
    });

    this.specifications.push(specification);
  }

  list(): Specification[] {
    return this.specifications;
  }
}

export { SpecificationRepository };
