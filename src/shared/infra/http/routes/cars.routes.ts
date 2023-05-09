import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAllAvailableCarsController } from "@modules/cars/useCases/listCars/ListAllAvailableCarsController";

import { admin } from "../middlewares/admin";
import { authenticated } from "../middlewares/authenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAllAvailableCarsController = new ListAllAvailableCarsController();
const createCarSpecificationUseCase = new CreateCarSpecificationController();

carsRoutes.post("/", [authenticated, admin], createCarController.handle);
carsRoutes.get("/available", listAllAvailableCarsController.handle);
carsRoutes.post(
  "/:id/specifications",
  [authenticated, admin],
  createCarSpecificationUseCase.handle
);

export { carsRoutes };
