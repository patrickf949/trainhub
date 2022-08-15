import courseData from "../../fixtures/courses.json";

describe("contact delete", () => {
  beforeEach(() => {
    // intercept the contacts view API

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
    cy.intercept(
      {
        method: "DELETE",
        url: `**/api/v1/courses/${courseData.course.id}`,
      },
      {
        statusCode: 200,
        body: courseData.singleCourse,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("deleteCourse");
    cy.visit(`/courses/view/${courseData.course.id}`);
  });

  it("can navigate to delete course", () => {
    cy.contains("✖").each(
      ($btn) => {
        cy.wrap($btn).click();
      }
    );
    cy.contains("Delete").first().click();
    cy.contains(
      `Are you sure you want to delete the course: ${courseData.course.name}`
    ).should("exist");
  });
  it("can handle failed course load", () => {
    cy.intercept(
      {
        method: "GET",
        url: `**/api/v1/courses/${courseData.course.id}`,
      },
      {
        statusCode: 400,
        body: { message: "failed" },
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("failGetContact");
    cy.visit(`/courses/delete/${courseData.course.id}`);
    cy.contains("Failed to load Course").should("exist");
  });
  it("can successfully delete contact", () => {
    cy.visit(`/courses/delete/${courseData.course.id}`);
    cy.contains("Delete").first().click();
    cy.contains("Course Deleted").should('exist');
  });
  it("can handle failed delete", () => {
    cy.intercept(
      {
        method: "DELETE",
        url: `**/api/v1/courses/${courseData.course.id}`,
      },
      {
        statusCode: 400,
        body: { message: "failed" },
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("faildeleteContact");
    cy.visit(`/courses/delete/${courseData.course.id}`);
    cy.contains("Delete").first().click();
    cy.contains("Failed to Delete Course!").should('exist');
  });
});
