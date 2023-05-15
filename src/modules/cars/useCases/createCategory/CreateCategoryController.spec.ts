import { hash } from "bcrypt";
import request from "supertest";
import { v4 as uuidV4 } from "uuid";

import { appDataSource } from "@shared/infra/database/typeorm/data-source";
import { app } from "@shared/infra/http/app";

const userCredentials = {
  email: "test@admin.com",
  password: "123",
};
const payload = {
  name: "Category test",
  description: "Description rest",
};
let token: string;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    const id = uuidV4();
    const password = await hash(userCredentials.password, 8);

    await appDataSource.initialize();

    await appDataSource.runMigrations();

    const queryBuilder = appDataSource.createQueryBuilder();

    await queryBuilder
      .insert()
      .into("users")
      .values({
        id,
        name: "John Doe",
        email: userCredentials.email,
        password,
        driver_license: "A123",
        admin: true,
      })
      .execute();

    const responseToken = await request(app)
      .post("/auth")
      .send(userCredentials);
    token = responseToken.body.token;
  });

  afterAll(async () => {
    await appDataSource.dropDatabase();
    await appDataSource.destroy();
  });

  it("should be able to create a category", async () => {
    const response = await request(app)
      .post("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(payload);

    expect(response.status).toBe(201);
  });

  it("should not be able to create an existing category", async () => {
    const response = await request(app)
      .post("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(payload);

    expect(response.status).toBe(422);
  });
});
