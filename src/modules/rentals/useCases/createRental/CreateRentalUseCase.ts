import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarUnavailableException } from "@modules/rentals/errors/CarUnavailablesException";
import { InvalidRentalTimeException } from "@modules/rentals/errors/InvalidRentalTimeException";
import { UserAlreadyHasARentalException } from "@modules/rentals/errors/UserAlreadyHasARentException";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { NotFoundException } from "@shared/errors/NotFoundException";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository,
    @inject("RentalsRepository") private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider") private dateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumRentalTime = 24;

    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new NotFoundException("Car not found.");
    }

    if (!car.available) {
      throw new CarUnavailableException();
    }

    const userOpenRentals = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (userOpenRentals) {
      throw new UserAlreadyHasARentalException();
    }

    const diffInHours = this.dateProvider.compare(
      this.dateProvider.now(),
      expected_return_date,
      "hours"
    );

    if (diffInHours < minimumRentalTime) {
      throw new InvalidRentalTimeException();
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    car.available = false;
    await this.carsRepository.save(car);

    return rental;
  }
}

export { CreateRentalUseCase };
