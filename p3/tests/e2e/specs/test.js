// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the homepage', () => {
    cy.visit('/')
    cy.contains('span', 'Barista')
  })
  it('Shows all the tracks', () => {
    cy.visit('/');
    cy.contains('.track-name', 'Experience');
    
  })
  it('Checks the sound effects', () => {
    cy.visit('/')
    cy.contains('span', 'Moody')
  })
})
describe('Account Page', () => {

    const user = {
        name: 'Jill Harvard',
        email: 'jill@harvard.edu',
        password: 'asdfasdf'
    }

    it('shows an error if login is invalid', () => {
        cy.visit('/account');
        cy.get('[data-test=email-input]').clear().type(user.email);
        cy.get('[data-test=password-input]').clear().type('this-password-should-not-work');
        cy.get('[data-test=login-button]').click();
        cy.contains('These credentials do not match our records');
    })

    it('lets a user log in and log out', () => {
        cy.visit('/account');
        cy.get('[data-test=email-input]').clear().type(user.email);
        cy.get('[data-test=password-input]').clear().type(user.password);
        cy.get('[data-test=login-button]').click();
        

        cy.get('[data-test=logout-button]').click();

        // We know logout works if we see the login button again
        cy.get('[data-test="login-button"]').should('exist');
    })
})
describe('Categories Page', () => {
  it('Visits the categories page', () => {
    cy.visit('/tracks/categories')
    cy.contains('.intro-cat', 'Catếgories')
  })
})
describe('Likes Page', () => {
  it('Visits the likes page', () => {
    cy.visit('/tracks/liked')
    cy.contains('h1', 'Access Denied')
  })
})
