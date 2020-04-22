describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Mia Erbus',
      username: 'root',
      password: 'sekret',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.contains('Mia Erbus logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Mia Erbus logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'sekret' })
    })

    it('A blog can be created', function () {
      cy.contains('new note').click()
      cy.get('#title').type('A new blog created by cypress')
      cy.get('#author').type('Milly Cypress')
      cy.get('#url').type('http://cypress.io')
      cy.get('#create-button').click()
      cy.contains('A new blog created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'A new blog created by cypress',
          author: 'Milly Cypress',
        })
      })

      it('user can like a blog', function () {
        cy.contains('view').click()
        cy.get('.likes').contains('0')
        cy.contains('like').click()
        cy.get('.likes').contains('1')
      })

      it('user who created a blog can delete it', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'A new blog created by cypress')
      })

      it('other users who didnt create it cannot delete the blog', function () {
        // logout the current user
        cy.contains('logout').click()

        // create another user
        const user = {
          name: 'Klara',
          username: 'klara',
          password: 'klara',
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')

        // login with the other user
        cy.login({ username: 'klara', password: 'klara' })

        // try to remove a blog
        cy.contains('view').click()
        cy.get('html').should('not.contain', 'remove')
      })
    })

    describe('and several blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'A new blog created by cypress',
          author: 'Milly Cypress',
          likes: 3,
        })
        cy.createBlog({
          title: 'Another blog created by cypress',
          author: 'Billy Cypress',
          likes: 5,
        })
        cy.createBlog({
          title: 'A third blog created by cypress',
          author: 'Rilly Cypress',
          likes: 4,
        })
      })

      it.only('blogs are ordered according to likes with the blog with the most likes being first', function () {
        // TODO: find all of the blogs and compare them in the callback function of a then command

        // open all the blogs
        cy.contains('view').click()
        cy.contains('view').click()
        cy.contains('view').click()

        // store all the number of likes in an array
        let likes = []
        cy.get('html')
          .find('.blog')
          .each((blog) => {
            likes.push(
              Number(
                blog[0].childNodes[1].childNodes[1].childNodes[0].innerText
              )
            )
          })

        // check if array is sorted correctly
        const isSmallerThanPrevious = (current, index, array) => {
          let nextIndex = index + 1
          let next = array[nextIndex]
          return nextIndex < array.length ? current >= next : true
        }
        console.log(likes.every(isSmallerThanPrevious))
      })
    })
  })
})
