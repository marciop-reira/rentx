import { EmailOrPasswordInvalidException } from "@modules/accounts/errors/EmailOrPasswordInvalidException";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

const user = {
  name: "test",
  password: "password",
  email: "test@example.com",
  driver_license: "1.1.1.1",
};

describe("Authenticate User", () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it("should be able to authenticate an user", async () => {
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a non-existent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "wrong@email.com",
        password: "wrong password",
      })
    ).rejects.toThrow(EmailOrPasswordInvalidException);
  });

  it("should not be able to authenticate an user with wrong password", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong password",
      })
    ).rejects.toThrow(EmailOrPasswordInvalidException);
  });
});
