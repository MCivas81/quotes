import { mount } from "cypress/react18";
import QuoteForm from "./QuoteForm";
import { Provider } from "react-redux";
import { store } from "../../state/store";
import QuoteList from "./QuoteList";

describe("<QuoteForm />", () => {
  it("renders correctly", () => {
    mount(
      <Provider store={store}>
        <QuoteForm />
      </Provider>
    );

    cy.get("form").should("exist");
    cy.get('textarea[name="quote"]').should("exist");
    cy.get('input[name="author"]').should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it("allows users to submit a quote", () => {
    mount(
      <Provider store={store}>
        <QuoteForm />
      </Provider>
    );
    
    cy.get('textarea[name="quote"]').type("This is a test quote");
    cy.get('input[name="author"]').type("Test Author");

    cy.get('button[type="submit"]').click();

    cy.get('textarea[name="quote"]').should("have.value", "");
    cy.get('input[name="author"]').should("have.value", "");
  });
});

describe("QuoteList", () => {
  it("renders correctly", () => {
    mount(
      <Provider store={store}>
        <QuoteList />
      </Provider>
    );

    cy.contains("Your list").should("exist");
  });

  it("displays quotes", () => {
    mount(
      <Provider store={store}>
        <QuoteList />
      </Provider>
    );

    cy.contains("This is a test quote").should("exist");
    cy.contains("Test Author").should("exist");
  });

  it("deletes a quote", () => {
    mount(
      <Provider store={store}>
        <QuoteList />
      </Provider>
    );

    cy.get('[data-testid="delete-button"]:first').click();

    cy.contains("This is a test quote").should("not.exist");
    cy.contains("Test Author").should("not.exist");
  });
});
