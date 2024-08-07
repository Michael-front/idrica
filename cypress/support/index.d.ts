import "@testing-library/cypress";

// Declara el módulo para añadir los comandos personalizados
declare global {
  namespace Cypress {
    interface Chainable {
      saveCookies(): Chainable<void>;
      restoreCookies(): Chainable<void>;
    }
  }
}
