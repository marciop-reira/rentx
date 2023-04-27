import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { authenticated } from "../middlewares/authenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload(process.env.AVATAR_DIR));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/avatar",
  [authenticated, uploadAvatar.single("avatar")],
  updateUserAvatarController.handle
);

export { usersRoutes };
