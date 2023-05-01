import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UnauthorizedException } from "@modules/accounts/errors/UnauthorizedException";
import { UserDoesNotExistException } from "@modules/accounts/errors/UserDoesNotExistException";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export async function authenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new UnauthorizedException();
  }

  try {
    const { sub: user_id } = verify(
      authorization.replace("Bearer ", ""),
      process.env.JWT_SECRET_KEY
    ) as IPayload;

    const userRepository = new UsersRepository();
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new UserDoesNotExistException();
    }

    request.user = user;

    return next();
  } catch (error) {
    if (error instanceof UserDoesNotExistException) {
      throw error;
    }

    throw new UnauthorizedException();
  }
}
