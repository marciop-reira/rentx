import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "rentx",
  password: "rentx",
  database: "rentx",
  synchronize: true,
  logging: false,
  entities: ["./src/modules/*/entities/*.ts"],
  subscribers: [],
  migrations: ["./src/database/typeorm/migrations/*.ts"],
});
