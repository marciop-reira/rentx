import { Repository } from "typeorm";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { appDataSource } from "@shared/infra/database/typeorm/data-source";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../../../repositories/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  public constructor() {
    this.repository = appDataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOneBy({
      name,
    });

    return category;
  }
}

export { CategoriesRepository };
