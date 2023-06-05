import { Request, Response } from "express";
import { container } from "tsyringe";

import { FinishRentalUseCase } from "./FinishRentalUseCase";

class FinishRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id: rental_id } = request.params;
    const finishRentalUseCase = container.resolve(FinishRentalUseCase);

    const rental = await finishRentalUseCase.execute({ user_id, rental_id });

    return response.status(200).json(rental);
  }
}

export { FinishRentalController };
