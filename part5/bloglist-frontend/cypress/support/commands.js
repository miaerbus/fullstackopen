// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', '/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: '/api/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogappUser')).token
      }`,
    },
  })
  cy.visit('http://localhost:3000')
})
