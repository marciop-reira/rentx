import { Repository } from "typeorm";
import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";
import { appDataSource } from "../../../../database/typeorm/data-source";

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
    return await this.repository.find();
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOneBy({
      name
    });

    return category;
  }
}

export { CategoriesRepository };
