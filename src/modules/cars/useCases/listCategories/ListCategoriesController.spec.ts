import { hash } from "bcrypt";
import request from "supertest";
import { v4 as uuidV4 } from "uuid";

import { createRandomCategory } from "@shared/factories/category-factory";
import { createRandomUser } from "@shared/factories/user-factory";
import { appDataSource } from "@shared/infra/database/typeorm/data-source";
import { app } from "@shared/infra/http/app";

const userCredentials = createRandomUser();
const category = createRandomCategory();
const category2 = createRandomCategory();

let token: string;

describe("List Category Controller", () => {
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

  it("should be able to list all categories", async () => {
    await request(app)
      .post("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(category);
    await request(app)
      .post("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(category2);

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("categories");
    expect(response.body.categories).toMatchObject([category, category2]);
  });
});
