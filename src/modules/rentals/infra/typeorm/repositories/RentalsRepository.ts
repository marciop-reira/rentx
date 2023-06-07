import { IsNull, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { appDataSource } from "@shared/infra/database/typeorm/data-source";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = appDataSource.getRepository(Rental);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const rental = this.repository.findOneBy({
      car_id,
      end_date: IsNull(),
    });

    return rental;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rental = this.repository.findOneBy({
      user_id,
      end_date: IsNull(),
    });

    return rental;
  }

  async findByIdAndUserId(id: string, user_id: string): Promise<Rental> {
    const rental = this.repository.findOneBy({ id, user_id });

    return rental;
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ["car"],
    });

    return rentals;
  }

  async save(rental: Rental): Promise<void> {
    await this.repository.save(rental);
  }
}

export { RentalsRepository };
