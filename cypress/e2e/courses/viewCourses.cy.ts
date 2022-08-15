import courseData from "../../fixtures/courses.json"

describe("courses view", () => {
  beforeEach(() => {
    // intercept the courses view API
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
    cy.visit("/courses");
  });
  it("displays add course", () => {
    cy.contains("Add Course").should("exist");
  });

  it("can move to add course page", () => {
    cy.intercept({//intercepts training schools view api
      method: "GET",
      url: "**/api/v1/trainingSchools/",
    },
    {
      statusCode: 200,
      body: {data:[]},
      headers: { "access-control-allow-origin": "*" },
    })
    cy.contains('Add Course').click();
    cy.contains('Course name').should('exist')
    cy.contains('*').should('exist')
    cy.contains('Submit').should('exist')
  });

  it("displays courses", () => {
    cy.get("tbody tr td").first().should("have.text", "1");
    cy.get("tbody tr td a").first().should("have.text", courseData.course.name);
  });
});
