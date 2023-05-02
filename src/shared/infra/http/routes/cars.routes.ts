import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { admin } from "../middlewares/admin";
import { authenticated } from "../middlewares/authenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.use(authenticated);

carsRoutes.post("/", admin, createCarController.handle);

export { carsRoutes };
