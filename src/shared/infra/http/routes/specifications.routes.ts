import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";

import { admin } from "../middlewares/admin";
import { authenticated } from "../middlewares/authenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.use(authenticated);

specificationsRoutes.post("/", admin, createSpecificationController.handle);
specificationsRoutes.get("/", listSpecificationsController.handle);

export { specificationsRoutes };
