import contactData from "../../fixtures/contacts.json";

describe("contact delete", () => {
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
    cy.intercept(
      {
        method: "DELETE",
        url: `**/api/v1/contacts/${contactData.contact.id}`,
      },
      {
        statusCode: 200,
        body: contactData.singleContact,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("deleteContact");
    cy.visit(`/contacts/view/${contactData.contact.id}`);
  });

  it("can navigate to delete contact", () => {
    cy.contains("Delete").first().click();
    cy.contains(
      `Are you sure you want to delete the contact: ${contactData.contact.phoneNumber}`
    ).should("exist");
  });
  it("can handle failed contact load", () => {
    cy.intercept(
      {
        method: "GET",
        url: `**/api/v1/contacts/${contactData.contact.id}`,
      },
      {
        statusCode: 400,
        body: { message: "failed" },
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("failGetContact");
    cy.visit(`/contacts/delete/${contactData.contact.id}`);
    cy.contains("Failed to load Contact").should("exist");
  });
  it("can successfully delete contact", () => {
    cy.visit(`/contacts/delete/${contactData.contact.id}`);
    cy.contains("Delete").first().click();
    cy.contains("Contact Deleted").should('exist');
  });
  it("can handle failed delete", () => {
    cy.intercept(
      {
        method: "DELETE",
        url: `**/api/v1/contacts/${contactData.contact.id}`,
      },
      {
        statusCode: 400,
        body: { message: "failed" },
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("faildeleteContact");
    cy.visit(`/contacts/delete/${contactData.contact.id}`);
    cy.contains("Delete").first().click();
    cy.contains("Failed to Delete Contact!").should('exist');
  });
});
