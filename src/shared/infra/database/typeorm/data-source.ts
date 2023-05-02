import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

export const appDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  subscribers: [],
  migrations: ["./src/shared/infra/database/typeorm/migrations/*.ts"],
});
