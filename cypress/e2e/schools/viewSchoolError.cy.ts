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
        statusCode: 400,
        body: {message:"Failed"},
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("getschool");
    cy.visit(`/trainingSchools/view/${schoolData.school.id}`);
  });
  
  it("handles error from api", () => {
    cy.get('.Toastify').contains('Failed to load school').should('exist')
  });
});
