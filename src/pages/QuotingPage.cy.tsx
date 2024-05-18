import { mount } from "cypress/react18";
import QuotingPage from "./QuotingPage";
import { Provider } from "react-redux";
import { store } from "../state/store";

describe("<QuotingPage />", () => {
  context("Small screen (less than 640)", () => {
    beforeEach(() => {
      cy.viewport(639, 800); // Set viewport size to less than 640
    });

    it("renders correctly", () => {
      mount(
        <Provider store={store}>
          <QuotingPage />
        </Provider>
      );

      cy.get('[data-testid="random-quote-flyout"]').should("exist");
      cy.get('[data-testid="quote-form"]').should("exist");
      cy.get('[data-testid="quote-list"]').should("exist");
    });
  });

  context("Large screen (more than 640)", () => {
    beforeEach(() => {
      cy.viewport(641, 800); // Set viewport size to more than 640
    });

    it("renders correctly", () => {
      mount(
        <Provider store={store}>
          <QuotingPage />
        </Provider>
      );

      cy.get('[data-testid="random-quote-card"]').should("exist");
      cy.get('[data-testid="quote-form"]').should("exist");
      cy.get('[data-testid="quote-list"]').should("exist");
    });
  });
});
