import schoolData from "../../fixtures/schools.json";

describe("school delete", () => {
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
    ).as("getSchool");
    cy.intercept(
      {
        method: "DELETE",
        url: `**/api/v1/trainingSchools/${schoolData.school.id}`,
      },
      {
        statusCode: 200,
        body: schoolData.singleSchool,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("deleteSchool");
    cy.visit(`/trainingSchools/view/${schoolData.school.id}`);
    cy.wait('@getSchool').then(()=>{
      cy.contains("✖").each(
        ($btn) => {
          cy.wrap($btn).click();
        }
      );
    })

  });

  it("can navigate to delete school", () => {
    cy.contains("Delete").first().click();
    cy.contains(
      `Are you sure you want to delete the school: ${schoolData.school.name}`
    ).should("exist");
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
    ).as("failGetschool");
    cy.visit(`/trainingSchools/delete/${schoolData.school.id}`);
    cy.contains("Failed to load school").should("exist");
  });

  it("can successfully delete school", () => {
    cy.visit(`/trainingSchools/delete/${schoolData.school.id}`);
    cy.contains("✖").each(
      ($btn) => {
        cy.wrap($btn).click();
      }
    );
    cy.contains("Delete").first().click();
    cy.contains("Successfully deleted").should('exist');
  });

  it("can handle failed delete", () => {
    cy.intercept(
      {
        method: "DELETE",
        url: `**/api/v1/trainingSchools/${schoolData.school.id}`,
      },
      {
        statusCode: 400,
        body: { message: "failed" },
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("failDeleteSchool");
    cy.visit(`/trainingSchools/delete/${schoolData.school.id}`);
    cy.contains("Delete").first().click();
    cy.contains("Failed to delete School").should('exist');
  });
});
