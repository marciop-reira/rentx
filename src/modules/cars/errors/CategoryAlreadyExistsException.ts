class CategoryAlreadyExistsException extends Error {
  public code: number;

  constructor() {
    super();
    this.code = 400;
    this.message = "Category already exists.";
  }
}

export { CategoryAlreadyExistsException };
