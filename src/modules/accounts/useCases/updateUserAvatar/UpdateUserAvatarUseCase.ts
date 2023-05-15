import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { deleteFile } from "../../../../utils/file";

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
