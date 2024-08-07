export function checkHeader() {
  cy.get('[role="roleHeader"]').should("exist");
  cy.get('img[alt="logo"]').should("exist");
  cy.get('[class*="header__menu-item"]').should("have.length", 1);
  cy.get('[class*="header__login"]').should("have.length", 1);
}
