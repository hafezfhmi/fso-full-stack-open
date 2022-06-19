describe("Blog app", function () {
  beforeEach(function () {
    // Reset db to start test with a "default" db
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    // Create new user
    const user = {
      username: "admin",
      password: "abc123",
      name: "admin",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);

    // Visit the page to test
    cy.visit("http://localhost:3000");
  });

  // Test if login form is shown by default
  it("Login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("Login").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("admin");
      cy.get("#password").type("abc123");
      cy.get("#login-button").click();

      cy.contains("Logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("abc");
      cy.get("#password").type("abc");
      cy.get("#login-button").click();

      cy.contains("wrong username or password");
    });
  });
});
