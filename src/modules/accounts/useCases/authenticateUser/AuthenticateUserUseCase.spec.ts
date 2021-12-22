import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate an user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
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

  it("Should not be able to authenticate an non existing user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@example.com",
        password: "000000",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate a user with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "9999",
        email: "user@example.com",
        password: "password",
        name: "User test",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect-password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
