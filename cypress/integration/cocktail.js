describe("Cocktail", () => {
  before(() => {
    cy.visit("/cocktails/11690");
  });
  it("should display cocktail details", () => {
    cy.get("h1").should("contain", "Mai Tai");
    cy.get("p").should(
      "contain",
      "Shake all ingredients with ice. Strain into glass. Garnish and serve with straw."
    );
    cy.get("ol li").should("have.length", 5);
  });
  it("should be able to search for cocktail", () => {
    cy.get("input").type("margarita");
    cy.get("form").submit();
    cy.url().should("include", "/search?term=margarita");
  });
});
