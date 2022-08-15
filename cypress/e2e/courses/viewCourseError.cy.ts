import courseData from "../../fixtures/courses.json"

describe("courses view", () => {

  beforeEach(() => {
    // intercept the courses view API
    cy.intercept(
      {
        method: "GET",
        url: `**/api/v1/courses/${courseData.course.id}`,
      },
      {
        statusCode: 400,
        body: {message:"failed"},
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("getCourse");
    cy.visit(`/courses/view/${courseData.course.id}`);
  });
  
  it("handles error from api", () => {
    cy.contains('Failed to load Course').should('exist')
  });
});
