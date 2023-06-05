import dayjs from "dayjs";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalAlreadyFinishedException } from "@modules/rentals/errors/RentalAlreadyFinishedException";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { NotFoundException } from "@shared/errors/NotFoundException";
import { createRandomCar } from "@shared/factories/car-factory";

import { FinishRentalUseCase } from "./FinishRentalUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let finishRentalUseCase: FinishRentalUseCase;
let createdCar: Car;
let createdRental: Rental;

const car = createRandomCar(false);
const user_id = "b0c0c336-09e4-4d3e-b28b-4951bf8a3211";
const rental = {
  user_id,
  expected_return_date: dayjs().add(1, "days").toDate(),
};
const delayedDays = 2;
const delayedRental = {
  user_id,
  expected_return_date: dayjs().subtract(delayedDays, "days").toDate(),
};

describe("Create Rental", () => {
  beforeAll(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    finishRentalUseCase = new FinishRentalUseCase(
      carsRepositoryInMemory,
      rentalsRepositoryInMemory,
      dateProvider
    );

    createdCar = await carsRepositoryInMemory.create(car);
    createdRental = await rentalsRepositoryInMemory.create({
      ...rental,
      car_id: createdCar.id,
    });
  });

  it("should be able to finish a rental", async () => {
    const finishedRental = await finishRentalUseCase.execute({
      user_id,
      rental_id: createdRental.id,
    });

    expect(finishedRental.end_date).toEqual(expect.any(Date));
    expect(finishedRental.total).toEqual(createdCar.daily_rate);
    expect(createdRental).toMatchObject({ ...rental, car_id: createdCar.id });
    expect(createdCar.available).toBe(true);
  });

  it("should not be able to finish a rental already finished", async () => {
    expect(
      finishRentalUseCase.execute({
        user_id,
        rental_id: createdRental.id,
      })
    ).rejects.toThrow(RentalAlreadyFinishedException);
  });

  it("should be able to finish a rental after expected return date", async () => {
    const createdRental = await rentalsRepositoryInMemory.create({
      ...delayedRental,
      car_id: createdCar.id,
    });

    const finishedRental = await finishRentalUseCase.execute({
      user_id,
      rental_id: createdRental.id,
    });

    expect(finishedRental.end_date).toEqual(expect.any(Date));
    expect(finishedRental.total).toEqual(
      createdCar.daily_rate + createdCar.fine_amount * delayedDays
    );
    expect(createdCar.available).toBe(true);
  });

  it("should not be able to finish a non-existent rental", async () => {
    expect(
      finishRentalUseCase.execute({
        user_id,
        rental_id: "invalid-rental-id",
      })
    ).rejects.toThrow(NotFoundException);
  });
});
