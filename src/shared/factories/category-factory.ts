import { faker } from "@faker-js/faker";

export function createRandomCategory() {
  return {
    name: faker.vehicle.manufacturer(),
    description: faker.lorem.sentence(5),
  };
}
