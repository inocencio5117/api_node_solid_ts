import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DayjsProvider } from "@shared/container/providers/DateProvider/implementations/DayjsProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let dayjsProvider: DayjsProvider;

describe("Authenticate an user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dayjsProvider = new DayjsProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dayjsProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be possible to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@example.com",
      password: "password",
      name: "example",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    console.log(result);

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate an non existing user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@example.com",
        password: "000000",
      })
    ).rejects.toEqual(new AppError("Users not found"));
  });

  it("Should not be able to authenticate a user with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "9999",
      email: "user@example.com",
      password: "password",
      name: "User test",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect-password",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });
});
