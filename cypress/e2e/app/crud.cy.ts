import { doLogin } from "support/util";
import { ROUTES_PATH } from "../../../src/postsManager/config/routes/routes";

describe("Crud Page", () => {
  before(() => {
    doLogin("Sincere@april.biz", "1234"); //save cookie after login
  });

  beforeEach(() => {
    cy.restoreCookies();
    cy.visit(ROUTES_PATH.CRUD_POST_USER);
  });

  it("should create a new post", () => {
    // cy.getCookie("token").should("exist");

    cy.get('[class*="crudPostsUser__list"] > [class*="card"]').then(($posts) => {
      const initialLength = $posts.length;

      // Desplaza el campo de entrada de título a la vista
      cy.get("[data-testid=edit-title-input]").then(($input) => {
        cy.window().then((win) => {
          win.scrollTo(0, $input[0].offsetTop + 600);
        });
        cy.wrap($input).should("be.visible").first().type("New Post Title");
      });

      // Rellena el campo de entrada del cuerpo del post
      cy.get("[data-testid=edit-body-input]").first().type("This is the body of the new post.");

      // Haz clic en el botón de crear post
      cy.get("[data-testid=create-post-button]").click();

      // Paso 2: Verificar que la cantidad de posts ha aumentado en uno
      cy.get('[class*="crudPostsUser__list"] > [class*="card"]').should("have.length", initialLength + 1);

      // Opcional: Verifica que el nuevo post está en la lista
      cy.contains("New Post Title").should("exist");
    });
  });
});
