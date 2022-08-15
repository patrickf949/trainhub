import schoolData from "../../fixtures/schools.json"
import contactData from "../../fixtures/contacts.json"

describe('add a new contact', ()=>{
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
        // intercept contact create
        cy.intercept(
            {
              method: "POST",
              url: "**/api/v1/contacts/",
            },
            {
              statusCode: 200,
              body: contactData.contact,
              headers: { "access-control-allow-origin": "*" },
            }
          ).as("createContact");
        cy.visit("/contacts/create");
      });
      it("can add a contact", () => {
        //
        const contact = '0783838383'
        cy.get('[name=phoneNumber]').type(`${contact}{enter}`)

        cy.contains('Successfully created').should('exist')
      });
      it("can add a contact with a school", () => {
        // user should be able to select a school 
        const contact = '0793838383'
        const school = 'Uganda'
        cy.get('[name=phoneNumber]').type(`${contact}`)
        cy.get('input').eq(1).type(`${school}{enter}{enter}`)

        cy.contains('Successfully created').should('exist')
      });

      it("can validate numbers less than 10 digits", () => {
        //should not be able to submit contacts less than 4 digit
        const contact = '079383'
        cy.get('[name=phoneNumber]').type(`${contact}{enter}`)

        cy.contains('Phone Number must be 10 characters').should('exist')
      });

      it("can handle failed submission", () => {
        //should not be able to submit contacts less than 4 digit
        cy.intercept(
            {
              method: "POST",
              url: "**/api/v1/contacts/",
            },
            {
              statusCode: 400,
              body: contactData.contact,
              headers: { "access-control-allow-origin": "*" },
            }
          ).as("failCreateContact");
        const contact = '079383929292'
        cy.get('[name=phoneNumber]').type(`${contact}{enter}`)

        cy.contains('Failed').should('exist')
      });
})