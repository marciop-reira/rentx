import { faker } from "@faker-js/faker";

export function createRandomUser() {
  return {
    name: faker.person.fullName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    driver_license: faker.string.numeric(6),
  };
}
