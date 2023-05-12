class CarUnavailableExistException extends Error {
  public readonly code: number;

  constructor() {
    super();
    this.code = 422;
    this.message = "Car is not available.";
  }
}

export { CarUnavailableExistException };
