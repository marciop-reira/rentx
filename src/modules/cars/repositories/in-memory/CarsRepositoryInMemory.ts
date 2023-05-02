import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    category_id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      category_id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      created_at: new Date(),
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }
}

export { CarsRepositoryInMemory };
