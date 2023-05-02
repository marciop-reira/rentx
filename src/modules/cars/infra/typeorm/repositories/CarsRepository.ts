import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
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

  findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.repository.findOneBy({
      license_plate,
    });

    return car;
  }
}

export { CarsRepository };
