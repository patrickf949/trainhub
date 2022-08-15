describe("courses view error", () => {

  beforeEach(() => {
    // intercept the courses view API

    cy.intercept(
      {
        method: "GET",
        url: "**/api/v1/courses/",
      },
      {
        statusCode: 400,
        body: {},
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("getAllCourses");
    cy.visit(`/courses`);
  });
  
  it("handles error from api", () => {
    cy.contains('Failed').should('exist')
  });
});
