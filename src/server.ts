import * as dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { appDataSource } from "./database/typeorm/data-source";
import { router } from "./routes";
import { errors } from "./shared/infra/http/middlewares/errors";
import swaggerFile from "./swagger.json";
import "@shared/container";

const app = express();

dotenv.config();

appDataSource.initialize();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(errors);

app.listen(3000, () => console.log("Server is running!"));
