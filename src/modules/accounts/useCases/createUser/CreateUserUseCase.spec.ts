import { compare } from "bcrypt";

import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AlreadyExistsException } from "@shared/errors/AlreadyExistsExceptions";

import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

const user = {
  name: "test",
  password: "password",
  email: "test@example.com",
  driver_license: "1.1.1.1",
};

describe("Create User", () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    await createUserUseCase.execute(user);
    const { password, ...userWithoutPassword } = user;

    const createdUser = await usersRepositoryInMemory.findByEmail(user.email);

    expect(createdUser).toHaveProperty("id");
    expect(createdUser).toMatchObject(userWithoutPassword);
    expect(createdUser.password !== password).toBeTruthy();
    expect(compare(password, createdUser.password)).toBeTruthy();
  });

  it("should not be able to create an existing user", async () => {
    await expect(createUserUseCase.execute(user)).rejects.toThrow(
      AlreadyExistsException
    );
  });
});
