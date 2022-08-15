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
        statusCode: 200,
        body: contactData.singleContact,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("getContact");
    cy.visit("/contacts");
  });
  
  it("can view contact with view button", () => {

    cy.get("tbody tr td .btn").first().click();
    cy.contains(contactData.contact.phoneNumber).should('exist')

  });
});
