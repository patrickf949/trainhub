import contactData from "../../fixtures/contacts.json"

describe("contacts view", () => {

  beforeEach(() => {
    // intercept the contacts view API

    cy.intercept(
      {
        method: "GET",
        url: "**/api/v1/contacts/",
      },
      {
        statusCode: 200,
        body: contactData.contacts,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("getAllContacts");
    cy.intercept(
      {
        method: "GET",
        url: `**/api/v1/contacts/${contactData.contact.id}`,
      },
      {
        statusCode: 400,
        body: contactData.singleContact,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("getContact");
    cy.visit(`/contacts/view/${contactData.contact.id}`);
  });
  
  it("handles error from api", () => {
    cy.contains('Failed to load Contact').should('exist')
  });
});
