import { Repository } from "typeorm";

import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { appDataSource } from "@shared/infra/database/typeorm/data-source";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  public constructor() {
    this.repository = appDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async list(): Promise<Specification[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOneBy({
      name,
    });

    return specification;
  }
}

export { SpecificationsRepository };
