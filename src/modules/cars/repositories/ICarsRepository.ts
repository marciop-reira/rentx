import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IListAllAvailableCarsDTO } from "../dtos/IListAllAvailableCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  listAllAvailableBy(filters: IListAllAvailableCarsDTO): Promise<Car[]>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}

export { ICarsRepository };
