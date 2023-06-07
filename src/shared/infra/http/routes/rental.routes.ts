import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { FinishRentalController } from "@modules/rentals/useCases/finishRental/FinishRentalController";
import { ListRentalsController } from "@modules/rentals/useCases/listRentals/ListRentalsController";

import { authenticated } from "../middlewares/authenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const finishRentalController = new FinishRentalController();
const listRentalsController = new ListRentalsController();

rentalRoutes.use(authenticated);

rentalRoutes.post("/", createRentalController.handle);
rentalRoutes.get("/", listRentalsController.handle);
rentalRoutes.post("/:id/finish", finishRentalController.handle);

export { rentalRoutes };
