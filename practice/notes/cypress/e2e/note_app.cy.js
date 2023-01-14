describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'admin2',
      username: 'admin2',
      password: 'test'

    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login fails with the wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').type('admin2')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'admin2 logged in')
  })


  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('login form can be open', function () {
    cy.contains('login').click()
  })

  it('user can log in', function () {
    cy.contains('login').click()
    cy.get('#username').type('admin2')
    cy.get('#password').type('test')
    cy.get('#login-button').click()

    cy.contains('admin2 logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'admin2', password: 'test' })
    })

    it('a new note can be created', function () {
      cy.get(':nth-child(2) > :nth-child(1) > button').click()
      cy.get('#note-input').type('testing new note from cypress')
      cy.contains('save').click()
      cy.contains('testing new note from cypress')
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })
  
      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').click()
        cy.contains('second note').parent().find('button')
          .should('contain', 'make not important')
      })
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: false
        })
      })

      it('it can be made important', function () {
        cy.contains('another note cypress')
          .contains('make important')
          .click()

        cy.contains('another note cypress')
          .contains('make not important')
      })
    })

  })


})