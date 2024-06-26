describe('Dashboard page', () => {
  it('should approve admission in review', () => {
    cy.visit('http://localhost:3001/#/dashboard');

    cy.intercept('/registrations').as('registrations');
    cy.wait('@registrations');

    cy.get('div[role="progressbar"]', { timeout: 5000 }).should('not.exist');

    cy.get('[data-testid="column-review"]')
      .find('li')
      .first()
      .contains('button', 'Aprovar')
      .click();

    cy.get('[data-testid="column-review"]').find('li').first().contains('button', 'Sim').click();

    cy.get('div[role="alert"]', { timeout: 5000 })
      .should('be.visible')
      .contains('Admissão atualizada com sucesso.');
  });

  it('should reprove admission in review', () => {
    cy.visit('http://localhost:3001/#/dashboard');

    cy.intercept('/registrations').as('registrations');
    cy.wait('@registrations');

    cy.get('div[role="progressbar"]', { timeout: 5000 }).should('not.exist');

    cy.get('[data-testid="column-review"]')
      .find('li')
      .first()
      .contains('button', 'Reprovar')
      .click();

    cy.get('[data-testid="column-review"]').find('li').first().contains('button', 'Sim').click();

    cy.get('div[role="alert"]', { timeout: 5000 })
      .should('be.visible')
      .contains('Admissão atualizada com sucesso.');
  });

  it('should review admission approved', () => {
    cy.visit('http://localhost:3001/#/dashboard');

    cy.intercept('/registrations').as('registrations');
    cy.wait('@registrations');

    cy.get('div[role="progressbar"]', { timeout: 5000 }).should('not.exist');

    cy.get('[data-testid="column-approved"]')
      .children('ul')
      .children()
      .get('button')
      .contains('Revisar novamente')
      .click();

    cy.get('[data-testid="column-approved"]')
      .children('ul')
      .children()
      .get('button')
      .contains('Sim')
      .click();

    cy.get('div[role="alert"]', { timeout: 5000 })
      .should('be.visible')
      .contains('Admissão atualizada com sucesso.');
  });

  it('should review admission approved', () => {
    cy.visit('http://localhost:3001/#/dashboard');

    cy.intercept('/registrations').as('registrations');
    cy.wait('@registrations');

    cy.get('div[role="progressbar"]', { timeout: 5000 }).should('not.exist');

    cy.get('[data-testid="column-approved"]')
      .find('li')
      .first()
      .contains('button', 'Revisar novamente')
      .click();

    cy.get('[data-testid="column-approved"]').find('li').first().contains('button', 'Sim').click();

    cy.get('div[role="alert"]', { timeout: 5000 })
      .should('be.visible')
      .contains('Admissão atualizada com sucesso.');
  });

  it('should reprove admission approved', () => {
    cy.visit('http://localhost:3001/#/dashboard');

    cy.intercept('/registrations').as('registrations');
    cy.wait('@registrations');

    cy.get('div[role="progressbar"]', { timeout: 5000 }).should('not.exist');

    cy.get('[data-testid="column-approved"]')
      .find('li')
      .first()
      .contains('button', 'Reprovar')
      .click();

    cy.get('[data-testid="column-approved"]').find('li').first().contains('button', 'Sim').click();

    cy.get('div[role="alert"]', { timeout: 5000 })
      .should('be.visible')
      .contains('Admissão atualizada com sucesso.');
  });

  it('should approve admission reproved', () => {
    cy.visit('http://localhost:3001/#/dashboard');

    cy.intercept('/registrations').as('registrations');
    cy.wait('@registrations');

    cy.get('div[role="progressbar"]', { timeout: 5000 }).should('not.exist');

    cy.get('[data-testid="column-reproved"]')
      .find('li')
      .first()
      .contains('button', 'Aprovar')
      .click();

    cy.get('[data-testid="column-reproved"]').find('li').first().contains('button', 'Sim').click();

    cy.get('div[role="alert"]', { timeout: 5000 })
      .should('be.visible')
      .contains('Admissão atualizada com sucesso.');
  });

  it('should review admission reproved', () => {
    cy.visit('http://localhost:3001/#/dashboard');

    cy.intercept('/registrations').as('registrations');
    cy.wait('@registrations');

    cy.get('div[role="progressbar"]', { timeout: 5000 }).should('not.exist');

    cy.get('[data-testid="column-reproved"]')
      .find('li')
      .first()
      .contains('button', 'Revisar novamente')
      .click();

    cy.get('[data-testid="column-reproved"]').find('li').first().contains('button', 'Sim').click();

    cy.get('div[role="alert"]', { timeout: 5000 })
      .should('be.visible')
      .contains('Admissão atualizada com sucesso.');
  });
});
