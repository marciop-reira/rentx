import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IListAllAvailableCarsDTO } from "../dtos/IListAllAvailableCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  listAllAvailableBy(filters: IListAllAvailableCarsDTO): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  save(car: Car): Promise<void>;
}

export { ICarsRepository };
