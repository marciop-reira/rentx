import dayjs from "dayjs";

import { CarUnavailableExistException } from "@modules/rentals/errors/CarUnavailablesException";
import { InvalidRentalTimeException } from "@modules/rentals/errors/InvalidRentalTime";
import { UserAlreadyHasARentalException } from "@modules/rentals/errors/UserAlreadyHasARent";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

const rental = {
  user_id: "b0c0c336-09e4-4d3e-b28b-4951bf8a3211",
  car_id: "6842a197-5c0e-4f17-85b6-8c323cab9dd6",
  expected_return_date: dayjs().add(1, "day").toDate(),
};

describe("Create Rental", () => {
  beforeAll(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const createdRental = await createRentalUseCase.execute(rental);

    expect(createdRental).toHaveProperty("id");
    expect(createdRental).toMatchObject(rental);
  });

  it("should not be able to create a new rental for an unavailable car", async () => {
    await expect(
      createRentalUseCase.execute({ ...rental, user_id: "other-user-id" })
    ).rejects.toThrow(CarUnavailableExistException);
  });

  it("should not be able to create a new rental when user already has an active rental", async () => {
    await expect(
      createRentalUseCase.execute({ ...rental, car_id: "other-car-id" })
    ).rejects.toThrow(UserAlreadyHasARentalException);
  });

  it("should not be able to create a new rental with rental time less than 24 hours", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "fake-user-id",
        car_id: "fake-car-id",
        expected_return_date: new Date(),
      })
    ).rejects.toThrow(InvalidRentalTimeException);
  });
});
