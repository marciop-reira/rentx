import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";

import { ListRentalsUseCase } from "./ListRentalsUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let listRentalsUseCase: ListRentalsUseCase;

const users = [
  "6e592b0a-4d40-4c42-a679-70501b384834",
  "7adca296-b462-48b1-9adb-150fd917d806",
];
const cars = [
  "527a36ab-2648-4303-8c3f-35d153f7fdb9",
  "6c959104-6c9f-478a-92b9-976fc71de281",
  "bd9eecd0-11a8-4b7e-b19e-84c95aa71b58",
];
const rentals = [
  {
    user_id: users[0],
    car_id: cars[0],
    expected_return_date: dayjs().add(1, "days").toDate(),
  },
  {
    user_id: users[0],
    car_id: cars[1],
    expected_return_date: dayjs().add(2, "days").toDate(),
  },
  {
    user_id: users[1],
    car_id: cars[2],
    expected_return_date: dayjs().add(4, "days").toDate(),
  },
];

describe("List Rentals", () => {
  beforeAll(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    listRentalsUseCase = new ListRentalsUseCase(rentalsRepositoryInMemory);

    rentals.forEach(async (rental) => {
      await rentalsRepositoryInMemory.create(rental);
    });
  });

  it("should be able to list all user's rentals", async () => {
    const user_id = users[0];
    const userRentals = rentals.filter((rental) => rental.user_id === user_id);
    const listedRentals = await listRentalsUseCase.execute(user_id);

    expect(listedRentals).toHaveLength(userRentals.length);
    expect(listedRentals).toMatchObject(userRentals);
  });
});
