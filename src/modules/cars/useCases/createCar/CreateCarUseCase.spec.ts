import { CreateCarUseCase } from "./CreateCarUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "name",
      brand: "Brand",
      description: "Description",
      daily_rate: 123456,
      fine_amount: 100,
      license_plate: "asda",
      category_id: "asdasdsa89012903",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with an existing license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        brand: "Brand",
        description: "Description",
        daily_rate: 123456,
        fine_amount: 100,
        license_plate: "asda",
        category_id: "asdasdsa89012903",
      });

      await createCarUseCase.execute({
        name: "Car 2",
        brand: "Brand",
        description: "Description",
        daily_rate: 123456,
        fine_amount: 100,
        license_plate: "asda",
        category_id: "asdasdsa89012903",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a car with availability true", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 1",
      brand: "Brand",
      description: "Description",
      daily_rate: 123456,
      fine_amount: 100,
      license_plate: "asda",
      category_id: "asdasdsa89012903",
    });

    expect(car.available).toBe(true);
  });
});
