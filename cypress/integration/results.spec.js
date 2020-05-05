import "cypress-wait-until";

describe("Results", () => {
  before(() => {
    cy.visit("/search?term=margarita");
  });
  it("should contain correct about of cocktails", () => {
    cy.get(".cocktail-result").should("have.length", 5);
  });

  it("should not have visible button when no more cocktails to get", () => {
    cy.get(".more-results-container button").should("not.be.visible");
  });

  it("should get more cocktails when show more button is clicked", () => {
    cy.visit("/search?term=m");
    cy.waitUntil(() =>
      cy.get(".cocktail-result").then(() => {
        cy.get(".cocktail-result").should("have.length", 12);
        cy.get(".more-results-container button").should("be.visible");
        cy.get(".more-results-container button").click();
        cy.get(".cocktail-result").should("have.length", 24);
      })
    );
  });
  it("should route to result page when user add search input", () => {
    cy.get("input").type("cosmo");
    cy.get("form").submit();
    cy.url().should("include", "/search?term=cosmo");
  });
  it("should route to cocktail page when cocktail is clicked", () => {
    cy.get(".cocktail-result").first().click();
    cy.url().should("include", "/cocktails/17196");
  });

  it("should route to correct result page searches again", () => {
    cy.get("input").type("gin");
    cy.get("form").submit();
    cy.url().should("include", "/search?term=gin");
  });
});
