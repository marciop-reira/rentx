import { appDataSource } from "database/typeorm/data-source";
import { Repository } from "typeorm";

import { Category } from "@modules/cars/entities/Category";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

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
