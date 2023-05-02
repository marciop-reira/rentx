class NoPermissionException extends Error {
  public readonly code: number;

  constructor(message = "Insufficient Permissions.", code = 403) {
    super(message);
    this.message = message;
    this.code = code;
  }
}

export { NoPermissionException };
