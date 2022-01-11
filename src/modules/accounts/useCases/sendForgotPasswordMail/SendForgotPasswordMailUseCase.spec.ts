import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DayjsProvider } from "@shared/container/providers/DateProvider/implementations/DayjsProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dayjsProvider: DayjsProvider;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dayjsProvider = new DayjsProvider();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dayjsProvider,
      mailProviderInMemory
    );
  });

  it("Should be able to send a forgot password email to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "664168",
      email: "user@example.com",
      name: "user",
      password: "password",
    });

    await sendForgotPasswordMailUseCase.execute("user@example.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send an email if user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("example@test.com")
    ).rejects.toEqual(new AppError("User does not exist"));
  });

  it("should be able to create an user token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokenRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "664168",
      email: "user@example.com",
      name: "user",
      password: "password",
    });

    await sendForgotPasswordMailUseCase.execute("user@example.com");

    expect(generateTokenMail).toBeCalled();
  });
});
