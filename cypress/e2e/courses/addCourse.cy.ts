import schoolData from "../../fixtures/schools.json"
import courseData from "../../fixtures/courses.json"

describe('add a new course', ()=>{
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
        // intercept course create
        cy.intercept(
            {
              method: "POST",
              url: "**/api/v1/courses/",
            },
            {
              statusCode: 200,
              body: courseData.singleCourse,
              headers: { "access-control-allow-origin": "*" },
            }
          ).as("createCourse");
        cy.visit("/courses/create");
      });
      it("can add a course", () => {
        //

        cy.get('[name=name]').type(`${courseData.course.name}`)
        cy.get('[name=cadre]').type(`${courseData.course.cadre}`)
        cy.get('[name=professionalQualification]').type(`${courseData.course.cadre}`)
        cy.get('[name=durationYears]').type(`{backspace}${courseData.course.durationYears}{enter}`)

        cy.contains('Successfully created').should('exist')
      });
      it("can add a course with a school", () => {
        // user should be able to select a school 
        const course = 'Bsc. in Nursing & midwifery'
        const school = 'Uganda'
        cy.get('[name=name]').type(`${course}`)
        cy.get('[name=professionalQualification]').type(`${courseData.course.cadre}`)
        cy.get('[name=durationYears]').type(`{backspace}${courseData.course.durationYears}`)
        cy.get('input').eq(4).type(`${school}{enter}{enter}`)
        cy.contains('Successfully created').should('exist')
      });

      it("can handle failed submission", () => {
        cy.intercept(
            {
              method: "POST",
              url: "**/api/v1/courses/",
            },
            {
              statusCode: 400,
              body: {message:'Failed'},
              headers: { "access-control-allow-origin": "*" },
            }
          ).as("failCreateContact");
        const course = 'Test failed update'
        cy.get('[name=name]').type(`${course}`)
        cy.get('[name=cadre]').type(`${courseData.course.cadre}`)
        cy.get('[name=professionalQualification]').type(`${courseData.course.cadre}`)
        cy.get('[name=durationYears]').type(`{backspace}${courseData.course.durationYears}{enter}`)
        cy.contains('Failed to create Course').should('exist')
      });
})