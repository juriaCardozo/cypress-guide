describe('Code duplication bad practice - repetitive tests', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/search**'
    ).as('getStories')

    cy.visit('https://hackernews-seven.vercel.app')
    cy.wait('@getStories')

    cy.get('input[type="text"]')
      .should('be.visible')
      .and('have.value', 'redux')
      .as('searchField')
      .clear()
  })

  const array = ['reactjs', 'vuejs']

  array.forEach(word => {
    it('searches for text', () => {
      cy.search(`"${word}"{enter}`)

      cy.wait('@getStories')

      cy.get('.table-row')
        .should('have.length', 100)
    })

    // it(`searches for "${word}"`, () => {
    //   cy.search(`word{enter}`)

    //   cy.wait('@getStories')

    //   cy.get('.table-row')
    //     .should('have.length', 100)
    // })

  });
})
