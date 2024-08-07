import { checkHeader } from "support/util";

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the header", () => {
    checkHeader();
  });

  it("should display the posts", () => {
    cy.get(`[class*="home__list"]`).should("exist");
    cy.get(`[class*="home__list"] > [class*="card"]`).should("have.length.greaterThan", 0);
  });

  it("should filter posts", () => {
    cy.get(`[class*="filter__search"]`).should("be.visible").type("dolorem eum magni eos aperiam quia");
    cy.get(`[class*="home__list"] > [class*="card"]`).should("have.length", 1);
  });
});
