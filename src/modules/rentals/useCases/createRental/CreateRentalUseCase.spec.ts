import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import dayjs from "dayjs";
import { DayjsProvider } from "@shared/container/providers/DateProvider/implementations/DayjsProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsProvider: DayjsProvider;

describe("Create Rental", () => {
  const addOneDay = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsProvider = new DayjsProvider();
    createRentalUseCase = new CreateRentalUseCase(
      dayjsProvider,
      rentalsRepositoryInMemory
    );
  });

  it("Should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "54321",
      expected_return_date: addOneDay,
    });

    console.log(rental);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create an user have two simultaneous rents", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "54321",
        expected_return_date: addOneDay,
      });

      const rental = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "54321",
        expected_return_date: addOneDay,
      });

      console.log(rental);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "test",
        expected_return_date: addOneDay,
      });

      const rental = await createRentalUseCase.execute({
        user_id: "54321",
        car_id: "test",
        expected_return_date: addOneDay,
      });

      console.log(rental);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "test",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
