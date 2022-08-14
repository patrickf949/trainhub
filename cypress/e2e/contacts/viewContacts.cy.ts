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

  it("can move to add contact page", () => {
    cy.intercept({//intercepts training schools view api
      method: "GET",
      url: "**/api/v1/trainingSchools/",
    },
    {
      statusCode: 200,
      body: {data:[]},
      headers: { "access-control-allow-origin": "*" },
    })
    cy.contains('Add Contact').click();
    cy.contains('Phone Number').should('exist')
    cy.contains('Submit').should('exist')
    // cy.
  });

  it("displays contacts", () => {
    cy.get("tbody tr td").first().should("have.text", "1");
    cy.get("tbody tr td a").first().should("have.text", contactData.contact.phoneNumber);
  });
});
