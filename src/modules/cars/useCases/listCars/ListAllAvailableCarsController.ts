import { Request, Response } from "express";
import { container } from "tsyringe";

import { IListAllAvailableCarsDTO } from "@modules/cars/dtos/IListAllAvailableCarsDTO";

import { ListAllAvailableCarsUseCase } from "./ListAllAvailableCarsUseCase";

class ListAllAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id, name, brand }: IListAllAvailableCarsDTO =
      request.query;
    const listAllAvailableCarsUseCase = container.resolve(
      ListAllAvailableCarsUseCase
    );

    const cars = await listAllAvailableCarsUseCase.execute({
      category_id,
      name,
      brand,
    });

    return response.json({ cars });
  }
}

export { ListAllAvailableCarsController };
