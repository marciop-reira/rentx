import { faker } from "@faker-js/faker";

export function createRandomSpecification() {
  return {
    name: faker.vehicle.color(),
    description: faker.lorem.sentence(5),
  };
}
