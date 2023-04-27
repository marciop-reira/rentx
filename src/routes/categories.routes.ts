import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { authenticated } from "../middlewares/authenticated";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "../modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const uploadCsv = multer(uploadConfig.upload(process.env.TMP_DIR));

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.use(authenticated);

categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post(
  "/import",
  uploadCsv.single("file"),
  importCategoriesController.handle
);

export { categoriesRoutes };
