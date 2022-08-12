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
    cy.visit("/contacts");
  });
  it("displays add contact", () => {
    // access button should be available for users without access
    cy.get("button").first().should("have.text", "Add Contact");
  });

  it("displays contacts", () => {
    cy.get("tbody tr td").first().should("have.text", "1");
    cy.get("tbody tr td a").first().should("have.text", contactData.contact.phoneNumber);
  });
});
