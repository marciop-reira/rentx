import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "@modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

import { admin } from "../middlewares/admin";
import { authenticated } from "../middlewares/authenticated";

const categoriesRoutes = Router();

const uploadCsv = multer(uploadConfig.upload(process.env.TMP_DIR));

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.use(authenticated);

categoriesRoutes.post("/", admin, createCategoryController.handle);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post(
  "/import",
  [admin, uploadCsv.single("file")],
  importCategoriesController.handle
);

export { categoriesRoutes };
