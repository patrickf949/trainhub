import schoolData from "../../fixtures/schools.json";
import courseData from "../../fixtures/courses.json";

describe("update a course", () => {
  beforeEach(() => {
    // intercept the courses view API
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
        method: "GET",
        url: "**/api/v1/courses/",
      },
      {
        statusCode: 200,
        body: courseData.courses,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("getAllCourses");
    // intercept schools view
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
    // intercept course update
    cy.intercept(
      {
        method: "PATCH",
        url: `**/api/v1/courses/${courseData.course.id}`,
      },
      {
        statusCode: 200,
        body: courseData.course,
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("updateCourse");

    cy.visit(`/courses/update/${courseData.course.id}`);
    cy.wait('@getCourse').then(()=>{
      cy.wait('@getAllSchools').then(()=>{
        cy.contains("✖").each(
          ($btn) => {
            cy.wrap($btn).click();
          }
        );
      })
    }) 
  });
  it("can view update page", () => {
    cy.contains("Edit Course").should("exist");
    cy.contains("Course name").should("exist");
    cy.contains("*").should("exist");
  });

  it("can update a course", () => {
    const course = "9";
    cy.get('[name=name]').type(`{backspace}${course}`)
    cy.get('[name=cadre]').type(`{backspace}${course}`)
    cy.get('[name=professionalQualification]').type(`{backspace}${course}`)
    cy.get('[name=durationYears]').type(`{backspace}${course}{enter}`)
    cy.contains("Successfully updated").should("exist");
  });

  it("can handle failed update", () => {
    cy.intercept(
      {
        method: "PATCH",
        url: `**/api/v1/courses/${courseData.course.id}`,
      },
      {
        statusCode: 400,
        body: { message: "failed" },
        headers: { "access-control-allow-origin": "*" },
      }
    ).as("failUpdatecourse");
    
    const course = "9";
    cy.get('[name=name]').type(`{backspace}${course}{enter}`)

    cy.contains("Failed").should("exist");
  });
  it("can handle failed course load", () => {
    //should not be able to submit courses less than 4 digit
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
    ).as("failGetcourse");
    cy.visit(`/courses/update/${courseData.course.id}`);

    cy.contains("Failed to load Course").should("exist");
  });
});
