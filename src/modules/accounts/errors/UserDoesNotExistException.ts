class UserDoesNotExistException extends Error {
  public readonly code: number;

  constructor() {
    super();
    this.code = 401;
    this.message = "User does not exist..";
  }
}

export { UserDoesNotExistException };
