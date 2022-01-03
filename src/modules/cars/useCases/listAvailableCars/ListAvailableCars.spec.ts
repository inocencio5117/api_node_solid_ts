import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      brand: "Brand",
      description: "Description",
      daily_rate: 123456,
      fine_amount: 100,
      license_plate: "asda",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      brand: "Brand_test",
      description: "Description",
      daily_rate: 123456,
      fine_amount: 100,
      license_plate: "DEF-1111",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand_test",
    });
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      brand: "Brand_test",
      description: "Description",
      daily_rate: 123456,
      fine_amount: 100,
      license_plate: "ABC-4444",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "car2",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      brand: "Brand_test",
      description: "Description",
      daily_rate: 123456,
      fine_amount: 100,
      license_plate: "ABC-5544",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id",
    });

    expect(cars).toEqual([car]);
  });
});
