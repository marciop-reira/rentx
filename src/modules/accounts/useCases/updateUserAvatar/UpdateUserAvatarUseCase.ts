import { inject, injectable } from "tsyringe";
import { deleteFile } from "utils/file";

import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  user: User;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({ user, avatar_file }: IRequest): Promise<void> {
    if (user.avatar) {
      await deleteFile(`${process.env.AVATAR_DIR}${user.avatar}`);
    }

    /* eslint-disable no-param-reassign */
    user.avatar = avatar_file;

    await this.usersRepository.save(user);
  }
}

export { UpdateUserAvatarUseCase };
