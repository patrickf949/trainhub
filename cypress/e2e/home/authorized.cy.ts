describe("homepage testing", () => {
  beforeEach(() => {
    sessionStorage.clear();
    cy.visit("/");
  });
  it("access button should give user access to menu options", () => {
    //user should get access to menu options on clicking the access button
    cy.get("button").first().click();
    cy.get("li").should("have.length", 3);
    cy.get("li").first().should("have.text", "Courses");
    //
  });
});
