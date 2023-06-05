import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AlreadyExistsException } from "@shared/errors/AlreadyExistsException";
import { createRandomCar } from "@shared/factories/car-factory";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

const car = createRandomCar();

describe("Create Car", () => {
  beforeAll(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar).toHaveProperty("id");
    expect(createdCar).toMatchObject(car);
    expect(createdCar.available).toBe(true);
  });

  it("should not be able to create an existing car", async () => {
    await expect(createCarUseCase.execute(car)).rejects.toThrow(
      AlreadyExistsException
    );
  });
});
