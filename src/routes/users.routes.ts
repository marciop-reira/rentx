import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { authenticated } from "@shared/infra/http/middlewares/authenticated";

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
