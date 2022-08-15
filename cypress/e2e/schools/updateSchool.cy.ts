import schoolData from "../../fixtures/schools.json";
import contactData from "../../fixtures/contacts.json";
import courseData from "../../fixtures/courses.json";
import districts from "../../fixtures/districts.json";

describe("update a contact", () => {
  beforeEach(() => {
    // intercept the contacts view API
    cy.intercept(
      {
        method: "GET",
        url: `**/api/v1/trainingSchools/${schoolData.school.id}`,
      },
      {
        statusCode: 200,
        body: schoolData.singleSchool,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("getSchool");
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
    // intercept courses view api
    cy.intercept(
      {
        method: "GET",
        url: "**/api/v1/courses/",
      },
      {
        statusCode: 200,
        body: courseData.courses,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("getAllCourses");
    // intercept districts view api
    cy.intercept(
      {
        method: "GET",
        url: "**/api/v1/districts",
      },
      {
        statusCode: 200,
        body: districts,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("getAllCourses");

    // intercept contact update
    cy.intercept(
      {
        method: "PATCH",
        url: `**/api/v1/trainingSchools/${schoolData.school.id}`,
      },
      {
        statusCode: 200,
        body: schoolData.singleSchool,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("updateContact");

    cy.visit(`/trainingSchools/update/${schoolData.school.id}`);
    cy.wait('@getSchool').then(()=>{
      cy.wait('@getAllCourses').then(()=>{
        cy.contains("✖").each(
          ($btn) => {
            cy.wrap($btn).click();
          }
        );
      })
    }) 
  });
  it("can view update page", () => {
    cy.contains("Edit Training School").should("exist");
    cy.contains("School name").should("exist");
    cy.contains("*").should("exist");
  });

  it("can update a school", () => {

    const school = "update";
    cy.get("[name=name").type(`{backspace}${school}`);
    cy.contains('Submit').click();
    cy.contains("Successfully updated").should("exist");

  });

  it("can handle failed update", () => {
    cy.intercept(
      {
        method: "PATCH",
        url: `**/api/v1/trainingSchools/${schoolData.school.id}`,
      },
      {
        statusCode: 400,
        body: { message: "failed" },
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("failUpdateContact");
    
    const contact = "9";
    cy.get("[name=name]").click().type(`{backspace}${contact}{enter}`);

    cy.contains("Failed").should("exist");
  });
  it("can handle failed school load", () => {
    cy.intercept(
      {
        method: "GET",
        url: `**/api/v1/trainingSchools/${schoolData.school.id}`,
      },
      {
        statusCode: 400,
        body: { message: "failed" },
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("failGetContact");
    cy.visit(`/trainingSchools/update/${schoolData.school.id}`);

    cy.contains("Failed to load school").should("exist");
  });
});
