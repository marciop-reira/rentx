import { inject, injectable } from "tsyringe";

import { CarUnavailableExistException } from "@modules/rentals/errors/CarUnavailablesException";
import { InvalidRentalTimeException } from "@modules/rentals/errors/InvalidRentalTime";
import { UserAlreadyHasARentalException } from "@modules/rentals/errors/UserAlreadyHasARent";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository") private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider") private dateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumRentalTime = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new CarUnavailableExistException();
    }

    const userOpenRentals = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (userOpenRentals) {
      throw new UserAlreadyHasARentalException();
    }

    const dateDiff = this.dateProvider.compareInHours(
      this.dateProvider.now(),
      expected_return_date
    );

    if (dateDiff < minimumRentalTime) {
      throw new InvalidRentalTimeException();
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
