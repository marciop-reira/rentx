import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { NotFoundException } from "@shared/errors/NotFoundException";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

const car = {
  category_id: "7bf24bf8-ade1-4cef-88f8-617cd347a4f3",
  name: "Fox",
  description: "Short car",
  daily_rate: 60,
  license_plate: "FOX2023",
  fine_amount: 15,
  brand: "Volkswagen",
};
const specificationsTest = [
  {
    name: "Test",
    description: "Description test",
  },
  {
    name: "Test 2",
    description: "Description test 2",
  },
];

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
      specificationsTest[0]
    );
    const createdSpecification2 = await specificationsRepository.create(
      specificationsTest[1]
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
