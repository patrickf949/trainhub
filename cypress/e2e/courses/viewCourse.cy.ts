import courseData from "../../fixtures/courses.json"

describe("course view", () => {

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
    cy.intercept(
      {
        method: "GET",
        url: `**/api/v1/courses/${courseData.course.id}`,
      },
      {
        statusCode: 200,
        body: courseData.singleCourse,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("getCourse");
    cy.visit("/courses");
  });
  
  it("can view course with view button", () => {

    cy.get("tbody tr td .btn").first().click();
    cy.contains(courseData.course.name).should('exist')

  });
});
