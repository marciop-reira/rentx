import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AlreadyExistsException } from "@shared/errors/AlreadyExistsException";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

const car = {
  category_id: "df9803f6-acca-408f-b308-2fe484aa3007",
  name: "Onix",
  description: "Short car",
  daily_rate: 100,
  license_plate: "BRA2023",
  fine_amount: 20,
  brand: "Chevrolet",
};

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
