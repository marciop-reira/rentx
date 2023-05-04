interface ICreateCarDTO {
  category_id: string;
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  available?: boolean;
  brand: string;
}

export { ICreateCarDTO };
