import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AlreadyExistsException } from "@shared/errors/AlreadyExistsException";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

const category = {
  name: "Hatch",
  description: "Short car",
};

describe("Create Category", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    await createCategoryUseCase.execute(category);

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty("id");
    expect(createdCategory).toMatchObject(category);
  });

  it("should not be able to create an existing category", async () => {
    await expect(createCategoryUseCase.execute(category)).rejects.toThrow(
      AlreadyExistsException
    );
  });
});
