describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'admin',
      user: 'admin',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/user', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      const user = {
        username: 'admin',
        user: 'admin',
        password: 'test'
      }
      cy.login(user)
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('A new world')
      cy.get('#author').type('John')
      cy.get('#url').type('hello.com')
      cy.get('#create-blog').click()
      cy.contains('A new world')
    })

    describe('and 1 blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ author: 'John', title: 'A new world', url: 'hello.com' })
      })

      it('User can like a blog', function () {
        cy.get('#view').click()
        cy.get('#like').click()
        cy.get('#likes-count').should('contain', 1)
      })

      it('User can delete the blog', function() {
        cy.get('#view').click()
        cy.get('#remove-blog').click()
        cy.get('html').should('not.contain', 'A new world')
      })

    })
  })
})