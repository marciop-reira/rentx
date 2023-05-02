import { NextFunction, Request, Response } from "express";

import { NoPermissionException } from "@shared/errors/NoPermissionException";

export async function admin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> {
  const { user } = request;

  if (!user.admin) {
    throw new NoPermissionException();
  }

  return next();
}
