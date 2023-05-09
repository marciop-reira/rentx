import { NextFunction, Request, Response } from "express";

export function errors(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const statusCode =
    !Number.isNaN(error.code) && error.code >= 100 && error.code <= 599
      ? error.code
      : 500;

  return response.status(statusCode).json({
    error: statusCode === 500 ? "Internal Server Error" : error.message,
  });
}
