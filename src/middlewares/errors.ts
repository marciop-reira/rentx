import { NextFunction, Request, Response } from "express";

export function errors(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  return response.status(error.code || 500).json({
    error: error.message,
  });
}
