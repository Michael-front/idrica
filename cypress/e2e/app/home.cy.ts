import { checkHeader } from "support/util";
import { ROUTES_PATH } from "../../../src/postsManager/config/routes/routes";

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit(ROUTES_PATH.HOME);
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

  it("should navigate to login", () => {
    checkHeader();
    cy.get('[class*="header__login"]').click();
  });
});
