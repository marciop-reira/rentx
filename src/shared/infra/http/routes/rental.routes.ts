import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { FinishRentalController } from "@modules/rentals/useCases/finishRental/FinishRentalController";

import { authenticated } from "../middlewares/authenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const finishRentalController = new FinishRentalController();

rentalRoutes.use(authenticated);

rentalRoutes.post("/", createRentalController.handle);
rentalRoutes.post("/:id/finish", finishRentalController.handle);

export { rentalRoutes };
