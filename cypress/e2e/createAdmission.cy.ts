describe('Create admission page', () => {
  it('should create admission', () => {
    cy.visit('http://localhost:3001/#/create-admission');

    cy.get('input[name="employeeName"]').type('Maria da Silva');
    cy.get('input[name="employeeEmail"]').type('maria@email.com');
    cy.get('input[name="employeeCPF"]').type('07622331090');
    cy.get('input[name="date"]').type('2024-06-05');

    cy.get('button[type="submit"]').click();

    cy.get('div[role="alert"]', { timeout: 5000 })
      .should('be.visible')
      .contains('Admissão criada com sucesso.');
  });

  it('should validate required fields on submit', () => {
    cy.visit('http://localhost:3001/#/create-admission');

    cy.get('button[type="submit"]').click();

    cy.get('input[name="employeeName"]')
      .siblings('span[data-status]')
      .should('have.text', 'Campo obrigatório');

    cy.get('input[name="employeeEmail"]')
      .siblings('span[data-status]')
      .should('have.text', 'Campo obrigatório');

    cy.get('input[name="employeeCPF"]')
      .siblings('span[data-status]')
      .should('have.text', 'Campo obrigatório');

    cy.get('input[name="date"]')
      .siblings('span[data-status]')
      .should('have.text', 'Campo obrigatório');
  });

  it('should validate invalid data on submit', () => {
    cy.visit('http://localhost:3001/#/create-admission');

    cy.get('input[name="employeeName"]').type('Maria');
    cy.get('input[name="employeeEmail"]').type('maria@emai');
    cy.get('input[name="employeeCPF"]').type('07622331069');

    cy.get('button[type="submit"]').click();

    cy.get('input[name="employeeName"]')
      .siblings('span[data-status]')
      .should('have.text', 'Campo inválido');

    cy.get('input[name="employeeEmail"]')
      .siblings('span[data-status]')
      .should('have.text', 'Campo inválido');

    cy.get('input[name="employeeCPF"]')
      .siblings('span[data-status]')
      .should('have.text', 'Campo inválido');
  });

  it('should go to dashboard page on click back button', () => {
    cy.visit('http://localhost:3001/#/create-admission');

    cy.get('button[aria-label="Voltar"]').click();
    cy.location('href').should('eq', 'http://localhost:3001/#/dashboard');
  });
});
