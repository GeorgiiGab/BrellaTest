import { newUser } from "../support/page_objects/createUserPage"

describe('Test template', () => {

  beforeEach('open application', () => {
    cy.openHomePage()
})


  it('New user should be created when filling fields correctly', () => {
    // Verify that when filling all fields correctly the new user will be created

    newUser.createNewUser("Alex", true, "alex@brella.test", 50, 2005)
    newUser.createNewUser("Tom", false, "tom@brella.test", 70, 2000)

  })

  it('Error message should be displayed when entering wrong email format or inputNumber', () => {
    // Verify that if email or inputNumber incorrectly then the error messages will be displayed

    newUser.wrongInput("qwe", 200)

  })

  // 1) We can also automate the year selection using arrows instead of typing the year. I described how I
  // tried to do it in the createUserPage.
  //
  // 2) It can be verified that the Switch is on off by default with an automated test (but manual should do fine too)
  //
  // 3) We can aslo write automated API tests if we have documentation with request URL, Endpoints, headers and
  // parameters. In this case we could automate creating new user with POST and verifying the creation
  // with GET request.
  //
  // 4) Another possible automation is for the inputNumber. Instead of typing the number in the field we can
  // write a function to click arrows up or down until it gets to a desired number.
})
