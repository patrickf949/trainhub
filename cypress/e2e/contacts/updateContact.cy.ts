import schoolData from "../../fixtures/schools.json";
import contactData from "../../fixtures/contacts.json";

describe("update a contact", () => {
  beforeEach(() => {
    // intercept the contacts view API
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
        method: "GET",
        url: "**/api/v1/contacts/",
      },
      {
        statusCode: 200,
        body: contactData.contacts,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("getAllContacts");
    // intercept schools view
    cy.intercept(
      {
        method: "GET",
        url: "**/api/v1/trainingSchools/",
      },
      {
        statusCode: 200,
        body: schoolData.schools,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("getAllSchools");
    // intercept contact update
    cy.intercept(
      {
        method: "PATCH",
        url: `**/api/v1/contacts/${contactData.contact.id}`,
      },
      {
        statusCode: 200,
        body: contactData.contact,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("updateContact");

    cy.visit(`/contacts/update/${contactData.contact.id}`);
    cy.wait('@getContact').then(()=>{
      cy.wait('@getAllSchools').then(()=>{
        cy.contains("✖").each(
          ($btn) => {
            cy.wrap($btn).click();
          }
        );
      })
    }) 
  });
  it("can view update page", () => {
    cy.contains("Edit Contact").should("exist");
    cy.contains("Phone Number").should("exist");
    cy.contains("*").should("exist");
  });

  it("can update a contact", () => {
    //

    // const contact = "9";
    // cy.get('input').first().type(`{backspace}${contact}`)
    cy.contains("✖").each(
      ($btn) => {
        cy.wrap($btn).click();
      }
    );
    const contact = "9";
    cy.get("[name=phoneNumber]").type(`{backspace}${contact}`);
    cy.contains('Submit').click();
    cy.contains("Successfully updated").should("exist");

  });

  it("can handle failed update", () => {
    cy.intercept(
      {
        method: "PATCH",
        url: `**/api/v1/contacts/${contactData.contact.id}`,
      },
      {
        statusCode: 400,
        body: { message: "failed" },
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("failUpdateContact");
    
    const contact = "9";
    cy.get("[name=phoneNumber]").click({force:true}).type(`{backspace}${contact}{enter}`);

    cy.contains("Failed").should("exist");
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
    cy.visit(`/contacts/update/${contactData.contact.id}`);

    cy.contains("Failed to load Contact").should("exist");
  });
});
