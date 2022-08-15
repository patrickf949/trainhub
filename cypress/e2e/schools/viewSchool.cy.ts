import schoolData from "../../fixtures/schools.json"

describe("schools view", () => {

  beforeEach(() => {
    // intercept the schools view API

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
    ).as("getAllschools");
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
    ).as("getschool");
    cy.visit("/trainingSchools");
  });
  
  it("can view school with view button", () => {

    cy.get("tbody tr td .btn").first().click();
    cy.contains(schoolData.school.name).should('exist')

  });
});
