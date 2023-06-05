import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { NotFoundException } from "@shared/errors/NotFoundException";
import { createRandomCar } from "@shared/factories/car-factory";
import { createRandomSpecification } from "@shared/factories/specification-factory";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

const car = createRandomCar();
const specification = createRandomSpecification();
const specification2 = createRandomSpecification();

describe("Create Car Specification", () => {
  beforeAll(() => {
    carsRepository = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    );
  });

  it("should be able to add a new specification to a car", async () => {
    const createdCar = await carsRepository.create(car);
    const createdSpecification = await specificationsRepository.create(
      specification
    );
    const createdSpecification2 = await specificationsRepository.create(
      specification2
    );

    const { specifications } = await createCarSpecificationUseCase.execute({
      car_id: createdCar.id,
      specifications_id: [createdSpecification.id, createdSpecification2.id],
    });

    expect(specifications).toEqual([
      createdSpecification,
      createdSpecification2,
    ]);
  });

  it("should not be able to add a new specification to an nonexistent car", async () => {
    await expect(
      createCarSpecificationUseCase.execute({
        car_id: "11111111-2222-3333-4444-555555555555",
        specifications_id: ["22222222-1111-4444-3333-555555555555"],
      })
    ).rejects.toThrow(NotFoundException);
  });
});
