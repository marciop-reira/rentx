import { Equal, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListAllAvailableCarsDTO } from "@modules/cars/dtos/IListAllAvailableCarsDTO";
import { appDataSource } from "@shared/infra/database/typeorm/data-source";

import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  public constructor() {
    this.repository = appDataSource.getRepository(Car);
  }

  async create({
    category_id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      category_id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOneBy({
      license_plate,
    });

    return car;
  }

  async listAllAvailableBy(filters: IListAllAvailableCarsDTO): Promise<Car[]> {
    const queryBuilder = this.repository
      .createQueryBuilder()
      .where("available = :available", {
        available: true,
      });

    Object.entries(filters).forEach(([index, value]) => {
      if (value) {
        queryBuilder.andWhere(`${index} = :${index}`, filters);
      }
    });

    return queryBuilder.getMany();
  }
}

export { CarsRepository };
