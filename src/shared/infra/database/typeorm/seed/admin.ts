import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import { appDataSource } from "../data-source";

async function create() {
  const id = uuidV4();
  const password = await hash("123456", 8);

  await appDataSource.initialize();

  const queryBuilder = appDataSource.createQueryBuilder();

  await queryBuilder
    .insert()
    .into("users")
    .values({
      id,
      name: "John Doe",
      email: "john@admin.com",
      password,
      driver_license: "A123",
      admin: true,
    })
    .execute();

  await appDataSource.destroy();
}

create();
