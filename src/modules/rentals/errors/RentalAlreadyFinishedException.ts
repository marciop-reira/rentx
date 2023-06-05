class RentalAlreadyFinishedException extends Error {
  public readonly code: number;

  constructor() {
    super();
    this.code = 422;
    this.message = "Rental already finished.";
  }
}

export { RentalAlreadyFinishedException };
