import schoolData from "../../fixtures/schools.json";
import courseData from "../../fixtures/courses.json";
import contactData from "../../fixtures/contacts.json";
import districts from "../../fixtures/districts.json";

describe("add a new contact", () => {
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

    // intercept school create api
    cy.intercept(
      {
        method: "POST",
        url: "**/api/v1/trainingSchools/",
      },
      {
        statusCode: 200,
        body: schoolData.singleSchool,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("createSchool");
    // visit school creation page
    cy.visit("/trainingSchools/create");
  });
  // it("can add a training school", () => {
  //   //
  //   const contact = "0783838383";
  //   cy.get("[name=phoneNumber]").type(`${contact}{enter}`);

  //   cy.contains("Successfully created").should("exist");
  // });
  it("can add a school with a contact, district and course", () => {
    // user should be able to select a school
    cy.contains("✖").each(
      ($btn) => {
        cy.wrap($btn).click();
      }
    );
    const contact = "079";
    const district = "kab";
    const course = "neu";
    cy.get("[name=name]").type(`${schoolData.school.name}`);
    cy.get("[name=principal]").type(`${schoolData.school.principal}`);
    cy.get("input").eq(7).type(`${district}{enter}`);
    cy.get("input").eq(9).type(`${course}{enter}`);
    cy.get("input").eq(8).type(`${contact}{enter}`);
    cy.contains("Submit").click();

    cy.contains("Successfully created").should("exist");
  });

  it("can validate principal more than 4 digits", () => {
    //should not be able to submit contacts less than 4 digit
    const principal = "dir";
    cy.get("[name=principal]").type(`${principal}{enter}`);
    cy.contains("Principal name must be at least 4 characters").should("exist");
  });

  it("can handle failed submission", () => {
    //should not be able to submit contacts less than 4 digit
    cy.intercept(
      {
        method: "POST",
        url: "**/api/v1/trainingSchools/",
      },
      {
        statusCode: 400,
        body: { message: "Failed" },
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("failCreateContact");
    const district = "kam";
    cy.get("[name=name]").type(`${schoolData.school.name}`);
    cy.get("[name=principal]").type(`${schoolData.school.principal}`);
    cy.get("input").eq(7).type(`${district}{enter}`);
    cy.contains("Submit").click();

    cy.contains("Failed").should("exist");
  });
});
