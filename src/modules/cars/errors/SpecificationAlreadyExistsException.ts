class SpecificationAlreadyExistsException extends Error {
  public code: number;

  constructor() {
    super();
    this.code = 400;
    this.message = "Specification already exists.";
  }
}

export { SpecificationAlreadyExistsException };
