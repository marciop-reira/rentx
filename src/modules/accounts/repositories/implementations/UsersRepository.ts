import { appDataSource } from "database/typeorm/data-source";
import { Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
  }

  async create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
    });

    await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({
      id,
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({
      email,
    });

    return user;
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }
}

export { UsersRepository };
