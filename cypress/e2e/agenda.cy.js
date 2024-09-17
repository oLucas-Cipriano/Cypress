/// <reference types="cypress" />
describe('Testes para o funcionamento da agenda', () => {
  beforeEach(()=>{    
    cy.visit('https://agenda-contatos-react.vercel.app/')
  })
  it('Deve incluir um contato', () => {
    cy.get('.contato').then(($contatosAntes)=>{
      const quantidadeAntes = $contatosAntes.length;
      cy.get('[type="text"]').type('nome')
      cy.get('[type="email"]').type('email@email.com')
      cy.get('[type="tel"]').type('123456789')
      cy.get('.adicionar').click()
      cy.get('.contato').should('have.length', quantidadeAntes + 1)
    })
  })
  it('Deve editar um contato', () => {
    cy.get('.edit').last().click()
    cy.get('[type="text"]').clear().type('nomeEditado')
    cy.get('[type="email"]').clear().type('emailEditado@email.com')
    cy.get('[type="tel"]').clear().type('987654321')
    cy.get('.alterar').click()
    cy.get('.contato').last().should('contain', 'nomeEditado').and('contain', 'emailEditado@email.com').and('contain', '987654321')
  })
  it('Deve excluir um contato', () => {
    cy.get('.contato').then(($contatosAntes)=>{
      const quantidadeAntes = $contatosAntes.length;
      cy.get('.delete').last().click()
      cy.get('.contato').should('have.length', quantidadeAntes - 1)
    })
  })
})