import { hash } from "bcrypt";

import { EmailOrPasswordInvalidException } from "@modules/accounts/errors/EmailOrPasswordInvalidException";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { createRandomUser } from "@shared/factories/user-factory";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;

const user = createRandomUser();

describe("Authenticate User", () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it("should be able to authenticate an user", async () => {
    await usersRepositoryInMemory.create({
      ...user,
      password: await hash(user.password, 8),
    });

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
