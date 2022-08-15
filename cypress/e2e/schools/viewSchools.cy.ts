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
    ).as("getAllSchools");
    cy.visit("/trainingSchools");
  });
  it("displays add school", () => {
    cy.get("button").contains("Add School").should('exist');
  });

  it("can move to add school page", () => {
    cy.intercept({//intercepts training schools view api
      method: "GET",
      url: "**/api/v1/contacts/",
    },
    {
      statusCode: 200,
      body: {data:[]},
      headers: { "access-control-allow-origin": "*" },
    })
    cy.intercept({//intercepts training schools view api
      method: "GET",
      url: "**/api/v1/courses/",
    },
    {
      statusCode: 200,
      body: {data:[]},
      headers: { "access-control-allow-origin": "*" },
    })
    cy.intercept({//intercepts training schools view api
      method: "GET",
      url: "**/api/v1/districts/",
    },
    {
      statusCode: 200,
      body: {data:[]},
      headers: { "access-control-allow-origin": "*" },
    })
    cy.contains('Add School').click();
    cy.contains('Add Training School').should('exist');
    cy.contains('School name').should('exist')
    cy.get('button').contains('Submit').should('exist')
    // cy.
  });

  it("displays schools", () => {
    cy.get("tbody tr td").first().should("have.text", "1");
    cy.get("tbody tr td a").first().should("have.text", schoolData.school.name);
  });
});
