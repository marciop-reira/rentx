import { Repository } from "typeorm";

import { ICreateCarImageDTO } from "@modules/cars/dtos/ICreateCarImageDTO";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { appDataSource } from "@shared/infra/database/typeorm/data-source";

import { CarImage } from "../entities/CarImage";

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  public constructor() {
    this.repository = appDataSource.getRepository(CarImage);
  }

  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const car_image = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(car_image);

    return car_image;
  }
}

export { CarsImagesRepository };
