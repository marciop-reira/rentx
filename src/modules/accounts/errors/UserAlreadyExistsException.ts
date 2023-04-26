class UserAlreadyExistsException extends Error {
  public code: number;

  constructor() {
    super();
    this.code = 400;
    this.message = "User already exists.";
  }
}

export { UserAlreadyExistsException };
