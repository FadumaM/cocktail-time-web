describe("Home", () => {
  before(() => {
    cy.visit("/");
  });
  it("should route to result page when user add search input", () => {
    cy.get("input").type("margarita");
    cy.get("form").submit();
    cy.url().should("include", "/search?term=margarita");
  });
});
