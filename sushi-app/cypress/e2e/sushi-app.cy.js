describe('Sushi shop main flow', () => {
  it('should load the page and navigate categories', () => {
    cy.visit('/')
    cy.contains('🌸 SAKURA').should('be.visible')
    cy.contains('button', 'Сети').click()
    cy.contains("Сет 'Сакура'").should('be.visible')
    cy.contains('button', 'Напої').click()
    cy.contains('Лимонад Цитрус').should('be.visible')
  })

  it('should add items to cart and proceed to checkout', () => {
    cy.visit('/')
    cy.contains('Кошик (0)').should('be.visible')
    cy.get('.buy-button').first().click()
    cy.contains('Кошик (1)').should('be.visible')
    cy.contains('Оформити замовлення').click()
    cy.contains('Дякуємо за замовлення!').should('be.visible')
  })
})
