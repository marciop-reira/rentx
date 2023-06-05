import { faker } from "@faker-js/faker";

export function createRandomCar(available = true) {
  return {
    category_id: faker.string.uuid(),
    name: faker.vehicle.vehicle(),
    brand: faker.vehicle.manufacturer(),
    description: faker.vehicle.bicycle(),
    license_plate: faker.vehicle.vrm(),
    daily_rate: faker.number.float({ min: 40, max: 300, precision: 0.01 }),
    fine_amount: faker.number.float({ min: 10, max: 50, precision: 0.01 }),
    available,
  };
}
