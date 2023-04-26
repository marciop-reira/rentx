class UnauthorizedException extends Error {
  public readonly code: number;

  constructor() {
    super();
    this.code = 401;
    this.message = "Unauthorized.";
  }
}

export { UnauthorizedException };
