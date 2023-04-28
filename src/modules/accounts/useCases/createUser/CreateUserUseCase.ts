import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AlreadyExistsException } from "@shared/errors/AlreadyExistsExceptions";

interface IRequest {
  name: string;
  password: string;
  email: string;
  driver_license: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license,
  }: IRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AlreadyExistsException("User already exists.");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
