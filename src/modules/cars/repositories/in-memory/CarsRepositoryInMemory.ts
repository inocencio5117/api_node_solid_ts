import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    name,
    description,
    category_id,
    fine_amount,
    license_plate,
    daily_rate,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      name,
      description,
      category_id,
      fine_amount,
      license_plate,
      daily_rate,
    });

    await this.cars.push(car);

    return car;
  }

  async findByLicencePlate(license_plate: string): Promise<Car> {
    return await this.cars.find((car) => car.license_plate === license_plate);
  }
}

export { CarsRepositoryInMemory };
