import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAllAvailableCarsController } from "@modules/cars/useCases/listCars/ListAllAvailableCarsController";

import { admin } from "../middlewares/admin";
import { authenticated } from "../middlewares/authenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAllAvailableCarsController = new ListAllAvailableCarsController();

carsRoutes.post("/", [authenticated, admin], createCarController.handle);
carsRoutes.get("/available", listAllAvailableCarsController.handle);

export { carsRoutes };
