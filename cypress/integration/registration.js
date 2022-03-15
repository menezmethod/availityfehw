/// <reference types="cypress" />

import {dataGenerator} from '../../src/test/data-generator';

describe('Register Test', () => {

    it('can register', () => {
        const user = dataGenerator();
        cy.visit('http://localhost:3000')
            .then(() => {
                cy.get('input[name=firstName]').click().type(user.firstName)
            })
            .then(() => {
                cy.get('input[name=lastName]').click().type(user.lastName)
            })
            .then(() => {
                cy.get('input[name=npiNum]').click().type((Math.floor(Math.random() * 10000000000).toString()))
            })
            .then(() => {
                cy.get('input[name=address]').click().type(user.address)
            })
            .then(() => {
                cy.get('[id="state"]')
                    .select('Florida').blur()
                    .wait(1000)
            })
            .then(() => {
                cy.get('[id="city"]')
                    .select('Miami')
                    .wait(500)
            })
            .then(() => {
                cy.get('input[name=zip]').click().type(user.zip)
            })
            .then(() => {
                cy.get('input[name=telephone]').click().type(user.phone)
            })
            .then(() => {
                cy.get('input[name=email]').click().type(user.email)
            })
            .then(() => {
                cy.get('button[type=submit]').click({force: true})
            })
    })
})