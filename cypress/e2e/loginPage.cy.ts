describe("Login Page", () => {
  it("should login successfully", () => {
    cy.visit("/login");

    cy.get('input[name="email"]').type("john@mail.com");
    cy.get('input[name="password"]').type("changeme");

    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="spinner"]').should("exist");

    cy.intercept("POST", "/api/login", {
      statusCode: 200,
      body: { token: "mockToken" },
    });

    cy.get('[data-testid="spinner"]').should("not.exist");

    // cy.visit("/quotes"); 
  });

  it("should display error message for invalid login", () => {
    cy.visit("/login");

    cy.get('input[name="email"]').type("invalid@example.com");
    cy.get('input[name="password"]').type("wrongpassword");

    cy.get('button[type="submit"]').click();

    cy.contains("Invalid email or password").should("exist");
  });
});
