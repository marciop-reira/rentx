class InvalidRentalTimeException extends Error {
  public readonly code: number;

  constructor() {
    super();
    this.code = 422;
    this.message = "The minimum rental time must be 24 hours.";
  }
}

export { InvalidRentalTimeException };
