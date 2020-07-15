describe('User can become subscriber', () => {
  beforeEach(() => {
    cy.server();

    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v0/auth",
      response: "fixture:registration_response.json",
      headers: {
        uid: "user@mail.com"
      }
    })

    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v0/movies',
      response: "fixture:movies.json",
    });

    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/v0/subscriptions',
      response: {
        paid: true,
        message: "Successfull payment, you are now a subscriber"
      }
    })

    cy.visit("/")

    cy.get("#login").click()
    cy.get("#toggle").click()
    cy.get("#auth-form").within(() => {
      cy.get("#email").type("user@mail.com")
      cy.get("#password").type("password")
      cy.get("#password-confirmation").type("password")
      cy.get('button').contains("Submit").click()
    })
  })

  it('successfully', () => {
    cy.get("#become-subscriber").click()
    cy.get("#payment-form").should("exist")
    cy.wait(1000)

    cy.get('iframe[name^="__privateStripeFrame5"]').then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="cardnumber"]')
        .type("4242424242424242", { delay: 50 });
    });

    cy.get('iframe[name^="__privateStripeFrame6"]').then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="exp-date"]')
        .type("1222", { delay: 10 });
    });

    cy.get('iframe[name^="__privateStripeFrame7"]').then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find('input[name="cvc"]')
        .type("999", { delay: 10 });
    });
  
    cy.get("#submit-payment").click()

    cy.get("#payment-message").should("contain", "You currently have an active subscription")
  })
})
