describe("blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.createUser({ name: "Dagime", username: "admin", password: "admin" });
    cy.createUser({ name: "TestUser", username: "test", password: "test" });
  });

  it("is login form shown", function () {
    cy.get("#username").should("exist");
    cy.get("#password").should("exist");
  });

  it("front page can be opened", function () {
    cy.contains("blogs");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.login({ username: "admin", password: "admin" });
      cy.contains("User:Dagime");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.contains("invalid username or password".toUpperCase());
      cy.get(".error").contains("invalid username or password".toUpperCase());
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "admin", password: "admin" });
      cy.createBlog({
        title: "testBlog",
        author: "testAuthor",
        url: "http://someTest.com",
      });
      cy.createBlog({
        title: "toDelete",
        author: "deleteBlog",
        url: "http://deleteBlog",
      });
    });

    it("can create blog", function () {
      cy.createBlog({
        title: "another test",
        author: "testAuthor2",
        url: "http://someTest.com",
      });
      cy.contains("another test");
    });

    it("can like blog", function () {
      cy.contains("testBlog").find("#moreButton").as("moreButton");
      cy.get("@moreButton").click();
      cy.get("#likeButton").click();
      cy.get("#likeButton").parent().should("contain", "Likes: 1");
    });

    it("can delete blog", function () {
      cy.contains("toDelete").parent().find("#deleteButton").as("deleteButton");
      cy.get("@deleteButton").click();
      cy.contains("another test").should("not.exist");
    });

    it("cannot see delete button for blogs created by another user", function () {
      cy.logout();
      cy.login({ username: "test", password: "test" });
      cy.contains("toDelete")
        .parent()
        .within(() => {
          cy.get("#deleteButton").should("not.exist");
        });
    });
  });

  describe("Blog List Ordering", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "test" });

      cy.createBlog({
        title: "First Blog",
        author: "Author A",
        url: "http://example.com",
      });
      cy.createBlog({
        title: "Second Blog",
        author: "Author B",
        url: "http://example.com",
      });
      cy.createBlog({
        title: "Third Blog",
        author: "Author C",
        url: "http://example.com",
      });

      cy.contains("First Blog")
        .parent()
        .within(() => {
          cy.get("#moreButton").click().wait(500);
          cy.get("#likeButton").click().wait(500).click();
        });

      cy.contains("Third Blog")
        .parent()
        .within(() => {
          cy.get("#moreButton").click().wait(500);
          cy.get("#likeButton").click().wait(500);
        });
    });

    it("displays blogs ordered by likes", function () {
      cy.visit("/");
      cy.get(".blog").eq(0).should("contain", "First Blog");
      cy.get(".blog").eq(1).should("contain", "Third Blog");
      cy.get(".blog").eq(2).should("contain", "Second Blog");
    });
  });
});
