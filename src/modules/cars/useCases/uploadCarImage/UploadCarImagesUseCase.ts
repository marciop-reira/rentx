import { inject, injectable } from "tsyringe";

import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { NotFoundException } from "@shared/errors/NotFoundException";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository,
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<CarImage[]> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new NotFoundException("Car not found.");
    }

    images_name.forEach(async (image_name) => {
      await this.carsImagesRepository.create({ car_id, image_name });
    });

    return [];
  }
}

export { UploadCarImagesUseCase };
