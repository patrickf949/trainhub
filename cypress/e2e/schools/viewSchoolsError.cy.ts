describe("schools view error", () => {

  beforeEach(() => {
    // intercept the schools view API

    cy.intercept(
      {
        method: "GET",
        url: "**/api/v1/trainingSchools/",
      },
      {
        statusCode: 400,
        body: {},
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("getAllschools");
    cy.visit(`/trainingSchools`);
  });
  
  it("handles error from api", () => {
    cy.contains('Failed').should('exist')
  });
});
