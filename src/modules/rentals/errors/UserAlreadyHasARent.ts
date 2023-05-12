class UserAlreadyHasARentalException extends Error {
  public readonly code: number;

  constructor() {
    super();
    this.code = 422;
    this.message = "User already has an active rental.";
  }
}

export { UserAlreadyHasARentalException };
