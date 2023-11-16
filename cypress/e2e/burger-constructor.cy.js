describe('test burger constructor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/')
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json',
    })
    cy.viewport(1450, 1000)

    cy.get('[data-test-id="burger-constructor-list"]').as('constructor')
    cy.get('[data-test-id="burger-ingredient"]').as('ingredient')
  })

  //   it('has burger ingredients container', () => {
  //     cy.get('[data-test-id="burger-ingredients-list"]').should('have.length', 1)
  //   })

  //   it('has 15 ingredients ', () => {
  //     cy.get('[data-test-id="burger-ingredient"]').should('have.length', 15)
  //   })

  //   it('can drag and drop bun', () => {
  //     cy.get('@ingredient').first().as('first')

  //     cy.get('@first').trigger('dragstart')

  //     cy.get('@constructor').trigger('drop')

  //     cy.get('[data-test-id="total-price"]').should('have.text', 2510)
  //     cy.get('[data-test-id="constructor-ingredients"]')
  //       .first()
  //       .should('have.text', 'Краторная булка N-200i  (верх)1255')

  //     cy.get('@ingredient').eq(1).as('second')
  //     cy.get('@second').trigger('dragstart')

  //     cy.get('@constructor').trigger('drop')

  //     cy.get('[data-test-id="total-price"]').should('have.text', 1976)
  //     cy.get('[data-test-id="constructor-ingredients"]')
  //       .first()
  //       .should('have.text', 'Флюоресцентная булка R2-D3  (верх)988')
  //   })

  //   it('can drag and drop filling', () => {
  //     cy.get('@ingredient').eq(3).as('sause')

  //     cy.get('@sause').trigger('dragstart')

  //     cy.get('@constructor').trigger('drop')

  //     cy.get('[data-test-id="total-price"]').should('have.text', 80)
  //     cy.get('[data-test-id="constructor-ingredients"]')
  //       .first()
  //       .should('have.text', 'Соус фирменный Space Sauce80')
  //   })

  //   it('can drag and drop multiplie items', () => {
  //     cy.get('@ingredient').eq(3).as('sause')

  //     cy.get('@sause').trigger('dragstart')

  //     cy.get('@constructor').trigger('drop')

  //     cy.get('@ingredient').eq(6).as('filling')

  //     cy.get('@filling').trigger('dragstart')

  //     cy.get('@constructor').trigger('drop')

  //     cy.get('@ingredient').eq(1).as('bun')

  //     cy.get('@bun').trigger('dragstart')

  //     cy.get('@constructor').trigger('drop')

  //     cy.get('[data-test-id="total-price"]').should('have.text', 2480)

  //     cy.get('[data-test-id="constructor-ingredients"]')
  //       .first()
  //       .should('have.text', 'Флюоресцентная булка R2-D3  (верх)988')
  //     cy.get('[data-test-id="constructor-ingredients"]')
  //       .eq(1)
  //       .should('have.text', 'Соус фирменный Space Sauce80')
  //     cy.get('[data-test-id="constructor-ingredients"]')
  //       .eq(3)
  //       .should('have.text', 'Флюоресцентная булка R2-D3  (низ)988')
  //     cy.get('[data-test-id="constructor-ingredients"]')
  //       .eq(2)
  //       .should('have.text', 'Биокотлета из марсианской Магнолии424')
  //   })

  //   it('can delete ingredients', () => {
  //     cy.get('@ingredient')
  //       .eq(3)
  //       .should('contain.text', '80Соус фирменный Space Sauce')
  //       .as('sause')
  //     cy.get('@sause').trigger('dragstart')
  //     cy.get('@constructor').trigger('drop')

  //     cy.get('@ingredient')
  //       .eq(6)
  //       .should('contain.text', '424Биокотлета из марсианской Магнолии')
  //       .as('filling')
  //     cy.get('@filling').trigger('dragstart')
  //     cy.get('@constructor').trigger('drop')

  //     cy.get('@ingredient').eq(1).as('bun')
  //     cy.get('@bun').trigger('dragstart')
  //     cy.get('@constructor').trigger('drop')

  //     cy.get('[data-test-id="constructor-ingredients"]')
  //       .first()
  //       .should('have.text', 'Флюоресцентная булка R2-D3  (верх)988')
  //     cy.get('[data-test-id="constructor-ingredients"]')
  //       .eq(1)
  //       .should('have.text', 'Соус фирменный Space Sauce80')
  //     cy.get('[data-test-id="constructor-ingredients"]')
  //       .eq(3)
  //       .should('have.text', 'Флюоресцентная булка R2-D3  (низ)988')
  //     cy.get('[data-test-id="constructor-ingredients"]')
  //       .eq(2)
  //       .should('have.text', 'Биокотлета из марсианской Магнолии424')

  //     cy.get('[data-test-id="constructor-ingredients"]')
  //       .eq(2)
  //       .find('.constructor-element__action')
  //       .click()

  //     cy.get('[data-test-id="constructor-ingredients"]')
  //       .eq(0)
  //       .should('have.text', 'Флюоресцентная булка R2-D3  (верх)988')
  //     cy.get('[data-test-id="constructor-ingredients"]')
  //       .eq(1)
  //       .should('have.text', 'Соус фирменный Space Sauce80')
  //     cy.get('[data-test-id="constructor-ingredients"]')
  //       .eq(2)
  //       .should('have.text', 'Флюоресцентная булка R2-D3  (низ)988')
  //     cy.get('[data-test-id="constructor-ingredients"]').should('have.length', 3)
  //   })

  it('can reorder ingredients', () => {
    cy.get('@ingredient')
      .eq(3)
      .should('contain.text', '80Соус фирменный Space Sauce')
      .as('sause')
    cy.get('@sause').trigger('dragstart')
    cy.get('@constructor').trigger('drop')

    cy.get('@ingredient')
      .eq(6)
      .should('contain.text', '424Биокотлета из марсианской Магнолии')
      .as('cutlet')
    cy.get('@cutlet').trigger('dragstart')
    cy.get('@constructor').trigger('drop')

    cy.get('@ingredient')
      .eq(7)
      .should('contain.text', '988Филе Люминесцентного тетраодонтимформа')
      .as('fillet')
    cy.get('@fillet').trigger('dragstart')
    cy.get('@constructor').trigger('drop')

    cy.get('@ingredient').eq(1).as('bun')
    cy.get('@bun').trigger('dragstart')
    cy.get('@constructor').trigger('drop')

    cy.get('[data-test-id="constructor-ingredients"]').as(
      'constructor-ingredients'
    )

    cy.get('@constructor-ingredients').eq(3).trigger('dragstart')
    cy.get('@constructor-ingredients').eq(1).trigger('drop')

    //  cy.get('@constructor-ingredients')
    //    .eq(1)
    //    .invoke('offset')
    //    .then((offset) => {
    //      const clientX = offset.left
    //      const clientY = offset.top

    //      cy.get('@constructor-ingredients')
    //        .eq(3)
    //        .trigger('mousemove', { clientX, clientY })
    //        .then(($element) => {
    //          $element.trigger('mouseup')
    //        })
    //    })
  })
})
