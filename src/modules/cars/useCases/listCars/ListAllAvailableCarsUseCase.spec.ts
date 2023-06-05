import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { createRandomCar } from "@shared/factories/car-factory";

import { ListAllAvailableCarsUseCase } from "./ListAllAvailableCarsUseCase";

let carsRepository: CarsRepositoryInMemory;
let listAllAvailableCarsUseCase: ListAllAvailableCarsUseCase;

const availableCar = createRandomCar();
const unavailableCar = createRandomCar(false);

describe("List Cars", () => {
  beforeAll(() => {
    carsRepository = new CarsRepositoryInMemory();
    listAllAvailableCarsUseCase = new ListAllAvailableCarsUseCase(
      carsRepository
    );
  });

  it("should be able to list all available cars", async () => {
    const availableCarCreated = await carsRepository.create(availableCar);
    await carsRepository.create(unavailableCar);

    const result = await listAllAvailableCarsUseCase.execute({});

    expect(result).toEqual([availableCarCreated]);
  });

  it("should be able to list all available cars by category", async () => {
    const category_id = "7245ed9e-1bdb-4a75-95b4-5d1473e97aca";
    await carsRepository.create({
      ...availableCar,
      category_id,
    });

    const result = await listAllAvailableCarsUseCase.execute({
      category_id,
    });

    expect(result[0].category_id).toEqual(category_id);
  });

  it("should be able to list all available cars by name", async () => {
    const name = "Corolla";
    await carsRepository.create({
      ...availableCar,
      name,
    });

    const result = await listAllAvailableCarsUseCase.execute({
      name,
    });

    expect(result[0].name).toEqual(name);
  });

  it("should be able to list all available cars by brand", async () => {
    const brand = "Toyota";
    await carsRepository.create({
      ...availableCar,
      brand,
    });

    const result = await listAllAvailableCarsUseCase.execute({
      brand,
    });

    expect(result[0].brand).toEqual(brand);
  });
});
