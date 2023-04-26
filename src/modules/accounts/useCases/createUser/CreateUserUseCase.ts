import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { UserAlreadyExistsException } from "../../errors/UserAlreadyExistsException";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  avatar: string;
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
    avatar,
  }: IRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsException();
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
      avatar,
    });
  }
}

export { CreateUserUseCase };
