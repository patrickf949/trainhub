describe("contacts view error", () => {

  beforeEach(() => {
    // intercept the contacts view API

    cy.intercept(
      {
        method: "GET",
        url: "**/api/v1/contacts/",
      },
      {
        statusCode: 400,
        body: {},
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("getAllContacts");
    cy.visit(`/contacts`);
  });
  
  it("handles error from api", () => {
    cy.contains('Failed').should('exist')
  });
});
