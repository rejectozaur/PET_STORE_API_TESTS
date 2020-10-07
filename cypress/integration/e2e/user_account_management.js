let uniqueNr = Date.now().toString()
let userName = 'automated_tester_' + uniqueNr

describe('Basic user\'s operations:', () => {
  it('creates an account', () => {
    cy.request('POST', 'user', {
      'username': userName,
      'firstName': 'John',
      'lastName': 'Doe',
      'email': 'test' + uniqueNr + '@email.com',
      'password': 'Password123!',
      'phone': '123456789',
      'userStatus': 0
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
  })

  it('logs user in into the system', () => {
    cy.request('GET', 'user/login', {
        'username': 'automated tester',
        'password': 'Password123!',
      }).then((response) => {
          expect(response.status).to.eq(200)   
          let regex = new RegExp(/[0-9]+/g)
          let returned_message = response.body.message
          let session_id = returned_message.match(regex)  
          expect(returned_message).to.deep.eql('logged in user session:' + session_id)
    })
  })

  it('logs user out', () => {
    cy.request('GET', '/' + 'user/logout', {
      }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.deep.include({message: 'ok'})
    })
  })

  it('updates user', () => {
    let updatedId = uniqueNr + 2
    cy.request('PUT', '/' + 'user/' + userName, {
      'id': updatedId
      }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.deep.include({message: updatedId})
    })
  })

  it('deletes user', () => {
    cy.request('DELETE', '/' + 'user/' + userName, {
      }).then((response) => {
          expect(response.status).to.eq(200)
    })
    cy.request({
      method: 'GET', 
      url: 'user/' + userName,
      failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404)
        expect(response).to.have.property('headers')
    })
  })
})
