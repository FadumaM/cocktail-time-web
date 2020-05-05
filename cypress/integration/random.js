import "cypress-wait-until";
describe("Random page", () => {
  it("should be able to route to random cocktail from homepage", () => {
    cy.visit("/");
    cy.get(".random-search").click();
    cy.url().should("include", "/random");
    cy.waitUntil(() =>
      cy.get("h1").then(() => {
        cy.get("img").should("be.visible");
        cy.get("h1").should("be.visible");
        cy.get("h2").should("be.visible");
        cy.get("p").should("be.visible");
        cy.get("ol li").should("be.visible");
      })
    );
  });
});
