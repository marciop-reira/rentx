import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAllAvailableCarsController } from "@modules/cars/useCases/listCars/ListAllAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImage/UploadCarImagesController";

import { admin } from "../middlewares/admin";
import { authenticated } from "../middlewares/authenticated";

const carsRoutes = Router();

const uploadFiles = multer(uploadConfig.upload(process.env.CARS_IMAGES_DIR));

const createCarController = new CreateCarController();
const listAllAvailableCarsController = new ListAllAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post("/", [authenticated, admin], createCarController.handle);
carsRoutes.get("/available", listAllAvailableCarsController.handle);
carsRoutes.post(
  "/:id/specifications",
  [authenticated, admin],
  createCarSpecificationController.handle
);
carsRoutes.post(
  "/:id/images",
  [authenticated, admin, uploadFiles.array("images", 10)],
  uploadCarImagesController.handle
);

export { carsRoutes };
