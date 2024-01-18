const { hits } = require('../../fixtures/stories')

describe('Hardcoded assertion bad practice', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/search**',
      { fixture: 'stories' }
    ).as('getStories')

    cy.visit('https://hackernews-seven.vercel.app')
    cy.wait('@getStories')
  })

  // it('searches with cy.fixture', () => {
  //   cy.fixture('stories').then(({hits}) => {
  //     cy.search('cypress.io')
  //     cy.wait('@getStories')


  //     cy.get('.table-row')
  //       .as('tableRows')
  //       .should('have.length', hits.length)
      
  //     hits.forEach((hit, index) => {
  //       cy.get('@tableRows')
  //         .eq(index)
  //         .should('contain', hit.title) 
  //     })
  //   })
  // })

  it('searches with javascript objects', () => {
    cy.get('.table-row')
      .as('tableRows')
      .should('have.length', hits.length)
    hits.forEach((hit, index) => {
      cy.get('@tableRows')
        .eq(index)
        .should('contain', hit.title) 
    })
  })
})