import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "rentx",
    password: "rentx",
    database: "rentx",
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: ["./src/database/typeorm/migrations/*.ts"],
});