import dayjs from "dayjs";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CarUnavailableException } from "@modules/rentals/errors/CarUnavailablesException";
import { InvalidRentalTimeException } from "@modules/rentals/errors/InvalidRentalTimeException";
import { UserAlreadyHasARentalException } from "@modules/rentals/errors/UserAlreadyHasARentException";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { NotFoundException } from "@shared/errors/NotFoundException";
import { createRandomCar } from "@shared/factories/car-factory";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;
let createdCar: Car;
let createdCar2: Car;

const car = createRandomCar();
const car2 = createRandomCar();

const rental = {
  user_id: "b0c0c336-09e4-4d3e-b28b-4951bf8a3211",
  expected_return_date: dayjs().add(1, "day").toDate(),
};

describe("Create Rental", () => {
  beforeAll(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      carsRepositoryInMemory,
      rentalsRepositoryInMemory,
      dateProvider
    );

    createdCar = await carsRepositoryInMemory.create(car);
    createdCar2 = await carsRepositoryInMemory.create(car2);
  });

  it("should be able to create a new rental", async () => {
    const createdRental = await createRentalUseCase.execute({
      ...rental,
      car_id: createdCar.id,
    });
    const rentedCar = await carsRepositoryInMemory.findById(createdCar.id);

    expect(createdRental).toHaveProperty("id");
    expect(createdRental).toMatchObject({ ...rental, car_id: createdCar.id });
    expect(rentedCar.available).toBe(false);
  });

  it("should not be able to create a new rental for an unavailable car", async () => {
    await expect(
      createRentalUseCase.execute({
        ...rental,
        user_id: "other-user-id",
        car_id: createdCar.id,
      })
    ).rejects.toThrow(CarUnavailableException);
  });

  it("should not be able to create a new rental when user already has an active rental", async () => {
    await expect(
      createRentalUseCase.execute({ ...rental, car_id: createdCar2.id })
    ).rejects.toThrow(UserAlreadyHasARentalException);
  });

  it("should not be able to create a new rental with rental time less than 24 hours", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "fake-user-id",
        car_id: createdCar2.id,
        expected_return_date: new Date(),
      })
    ).rejects.toThrow(InvalidRentalTimeException);
  });

  it("should not be able to create a new rental for a non-existent car", async () => {
    await expect(
      createRentalUseCase.execute({ ...rental, car_id: "fake-car-id" })
    ).rejects.toThrow(NotFoundException);
  });
});
