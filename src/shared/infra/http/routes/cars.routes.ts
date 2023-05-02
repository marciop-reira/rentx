import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { authenticated } from "../middlewares/authenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.use(authenticated);

carsRoutes.post("/", createCarController.handle);

export { carsRoutes };
