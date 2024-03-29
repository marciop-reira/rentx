import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findByIdAndUserId(id: string, user_id: string): Promise<Rental>;
  findOpenRentalByCarId(car_id: string): Promise<Rental>;
  findOpenRentalByUserId(user_id: string): Promise<Rental>;
  findByUserId(user_id: string): Promise<Rental[]>;
  save(rental: Rental): Promise<void>;
}

export { IRentalsRepository };
