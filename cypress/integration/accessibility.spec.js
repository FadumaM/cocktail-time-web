import "cypress-axe";
import "cypress-wait-until";

describe("accessible", () => {
  it("should be accessible Home", () => {
    cy.visit("/");
    cy.injectAxe();
    cy.checkA11y();
  });
  it("should be accessible Results page", () => {
    cy.visit(`/search?term=m`);
    cy.waitUntil(() =>
      cy.get(".cocktail-result").then(() => {
        cy.injectAxe();
        cy.checkA11y();
      })
    );
  });
  it("should be accessible Cocktails page", () => {
    cy.visit("/cocktails/17196");
    cy.waitUntil(() =>
      cy.get("h1").then(() => {
        cy.injectAxe();
        cy.checkA11y();
      })
    );
  });
  it("should be accessible Random Cocktail page", () => {
    cy.visit("/random");
    cy.waitUntil(() =>
      cy.get("h1").then(() => {
        cy.injectAxe();
        cy.checkA11y();
      })
    );
  });
});
