import express from "express";
import swaggerUi from "swagger-ui-express";

import { appDataSource } from "./database/typeorm/data-source";
import { router } from "./routes";
import swaggerFile from "./swagger.json";
import "./shared/container";

const app = express();

appDataSource.initialize();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3000, () => console.log("Server is running!"));
