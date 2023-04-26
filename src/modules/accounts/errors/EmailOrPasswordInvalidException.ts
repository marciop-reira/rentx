class EmailOrPasswordInvalidException extends Error {
  public code: number;

  constructor() {
    super();
    this.code = 401;
    this.message = "Email or password is invalid.";
  }
}

export { EmailOrPasswordInvalidException };
