import React from "react";
import { render } from "@testing-library/react";
import Cocktail from "./index";
describe("Cocktail", () => {
  let mockCocktail;
  beforeEach(() => {
    mockCocktail = {
      id: "1",
      name: "Cocktail name",
      instruction: "Cocktail instruction",
      ingredients: [
        { name: "rum", amount: "1 oz" },
        { name: "lime", amount: "1" },
      ],
    };
  });

  it("should render correctly", () => {
    const { baseElement } = render(<Cocktail cocktail={mockCocktail} />);
    expect(baseElement).toMatchSnapshot();
  });

  it("should render correct amount of ingredients", () => {
    const { container } = render(<Cocktail cocktail={mockCocktail} />);
    const ingredients = container.querySelectorAll("li");
    expect(ingredients).toHaveLength(2);
  });
});
