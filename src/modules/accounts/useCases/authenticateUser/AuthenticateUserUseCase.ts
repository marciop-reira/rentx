import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { EmailOrPasswordInvalidException } from "@modules/accounts/errors/EmailOrPasswordInvalidException";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  type: string;
  token: string;
  expires_in: number;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new EmailOrPasswordInvalidException();
    }

    const passwordIsCorrect = await compare(password, user.password);

    if (!passwordIsCorrect) {
      throw new EmailOrPasswordInvalidException();
    }

    const token = sign({}, process.env.JWT_SECRET_KEY, {
      subject: user.id,
      expiresIn: +process.env.JWT_EXPIRES_IN,
    });

    return {
      type: "Bearer",
      token,
      expires_in: +process.env.JWT_EXPIRES_IN,
    };
  }
}

export { AuthenticateUserUseCase };
