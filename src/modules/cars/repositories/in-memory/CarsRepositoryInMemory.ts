import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICreateCarSpecificationDTO } from "@modules/cars/dtos/ICreateCarSpecificationDTO";
import { IListAllAvailableCarsDTO } from "@modules/cars/dtos/IListAllAvailableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

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
    available = true,
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
      available,
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

  async listAllAvailableBy(filters: IListAllAvailableCarsDTO): Promise<Car[]> {
    const availableCars = this.cars.filter((car) => car.available === true);

    if (Object.values(filters).some((value) => value !== undefined)) {
      return availableCars.filter(
        (car) =>
          car.category_id === filters.category_id ||
          car.name === filters.name ||
          car.brand === filters.brand
      );
    }

    return availableCars;
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }

  async save(car: Car): Promise<void> {
    const carIndex = this.cars.indexOf(car);

    this.cars[carIndex] = car;
  }
}

export { CarsRepositoryInMemory };
