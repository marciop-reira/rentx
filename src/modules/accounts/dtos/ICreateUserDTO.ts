interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  admin?: boolean;
  driver_license: string;
}

export { ICreateUserDTO };
