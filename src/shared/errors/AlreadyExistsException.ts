class AlreadyExistsException extends Error {
  public readonly code: number;

  constructor(message: string, code = 422) {
    super(message);
    this.message = message;
    this.code = code;
  }
}

export { AlreadyExistsException };
