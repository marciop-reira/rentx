import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { RentalAlreadyFinishedException } from "@modules/rentals/errors/RentalAlreadyFinishedException";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { NotFoundException } from "@shared/errors/NotFoundException";

interface IRequest {
  user_id: string;
  rental_id: string;
}

@injectable()
class FinishRentalUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository,
    @inject("RentalsRepository") private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider") private dateProvider: IDateProvider
  ) {}

  async execute({ user_id, rental_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findByIdAndUserId(
      rental_id,
      user_id
    );

    if (!rental) {
      throw new NotFoundException("Rental not found.");
    }

    if (rental.end_date) {
      throw new RentalAlreadyFinishedException();
    }

    const car = await this.carsRepository.findById(rental.car_id);

    const daily_cost = this.calculateDailyCost(
      rental.start_date,
      car.daily_rate
    );
    const fine_cost = this.calculateFineCost(
      rental.expected_return_date,
      car.fine_amount
    );

    rental.end_date = this.dateProvider.now();
    rental.total = daily_cost + fine_cost;
    await this.rentalsRepository.save(rental);

    car.available = true;
    await this.carsRepository.save(car);

    return rental;
  }

  private calculateDailyCost(start_date: Date, daily_rate: number): number {
    const minimum_daily = 1;

    let daily = this.dateProvider.compare(
      start_date,
      this.dateProvider.now(),
      "days"
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    return daily * daily_rate;
  }

  private calculateFineCost(
    expected_return_date: Date,
    fine_amount: number
  ): number {
    let fine = 0;

    const delay = this.dateProvider.compare(
      expected_return_date,
      this.dateProvider.now(),
      "days"
    );

    if (delay > 0) {
      fine = delay * fine_amount;
    }

    return fine;
  }
}

export { FinishRentalUseCase };
