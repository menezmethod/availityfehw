/// <reference types="cypress" />

import {dataGenerator} from '../../src/test/data-generator';

describe('Register Test', () => {

    it('can register', () => {
        var i = 1;
        for (i = 0; i < 10 ; i++) {
            const user = dataGenerator();
            cy.visit('http://localhost:3000')
            .then(() => {
                cy.get('input[name=firstName]')
                    .click()
                    .type(user.firstName)
                    .invoke('val')
                    .should("not.be.empty")
            })
            .then(() => {
                cy.get('input[name=lastName]')
                    .click()
                    .type(user.lastName)
                    .invoke('val')
                    .should("not.be.empty")
            })
            .then(() => {
                cy.get('input[name=npiNum]')
                    .click()
                    .type((Math.floor(Math.random() * 1e10).toString()))
                    .wait(500)
                    .invoke('val')
                    .should("not.be.empty")
                    .should("have.length", 10)
            })
            .then(() => {
                cy.get('input[name=address]')
                    .click()
                    .type(user.address)
                    .invoke('val')
                    .should("not.be.empty")
            })
            .then(() => {
                cy.get('[id="state"]')
                    .select('Florida').blur()
                    .wait(500)
            })
            .then(() => {
                cy.get('[id="city"]')
                    .select('Miami')
                    .wait(500)
            })
            .then(() => {
                cy.get('input[name=zip]')
                    .click()
                    .type(user.zip)
            })
            .then(() => {
                cy.get('input[name=telephone]')
                    .click()
                    .type(user.phone)
                    .invoke('val')
                    .should("not.be.empty")

            })
            .then(() => {
                cy.get('input[name=email]')
                    .click()
                    .type(user.email)
                    .invoke('val')
                    .should("not.be.empty")
            })
            .then(() => {
                cy.get('form')
                    .submit() // Submit a form
                    .get('div[class=invalid-feedback]')
                    .should('not.exist');
            })}
    })

})
