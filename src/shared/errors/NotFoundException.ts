class NotFoundException extends Error {
  public readonly code: number;

  constructor(message = "Resource Not Found.", code = 404) {
    super(message);
    this.message = message;
    this.code = code;
  }
}

export { NotFoundException };
