describe('Testing remaining endpoints', () => {
  let uniqueNr = Date.now()
  let petId
  let orderId
  let orderBody = {
    id: uniqueNr,
    petId: petId,
    quantity: 1,
    shipDate: "2020-12-20T13:40:02.204+0000",
    status: 'placed',
    complete: true
  }
  let userBody = {
    "id": uniqueNr,
    "username": "username" + uniqueNr,
    "firstName": "Firstname",
    "lastName": "Lastname",
    "email": "test" + uniqueNr + "@user.com",
    "password": "pwd",
    "phone": "123456789",
    "userStatus": 1
  }
  let userName = userBody.username
  let body = {
    "id": uniqueNr,
    "category": {
      "id": uniqueNr,
      "name": "dog"
    },
    "name": "Unitowy Brutus",
    "photoUrls": [
      "https://ujeb.se/YYHsU"
    ],
    "tags": [
      {
        "id": 0,
        "name": "string"
      }
    ],
    "status": "available"
  }
  let usersArray = [userBody, userBody]

  before(() => {
    cy.request('POST', '/pet', body)
      .then((response) => {
        petId = response.body.id
        expect(response.status).to.eq(200)
      })
  })

  it('Find pet by ID', () => {
    cy.request('GET', '/pet/' + petId)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.deep.include(body)
        expect(response).to.have.property('headers')
      })
  })

  it('Place an order for a pet', () => {
    orderBody.petId = petId
    cy.request('POST', '/store/order', orderBody)
      .then((response) => {
        orderId = response.body.id
      })
  })

  it('Find purchase order by ID', () => {
    cy.request('GET', '/store/order/' + orderId)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.deep.include(orderBody)
        expect(response).to.have.property('headers')
      })
  })

  it('Delete purchase order by ID', () => {
    cy.request('DELETE', '/store/order/' + orderId)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.deep.include({ type: 'unknown', message: orderId.toString() })
        expect(response).to.have.property('headers')
      })
    cy.request({
      method: 'GET',
      url: '/store/order/' + orderId,
      failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(404)
        expect(response.body).to.deep.include({ type: 'error', message: 'Order not found' })
        expect(response).to.have.property('headers')
      })
  })

  it('Returns pet inventories by status', () => {
    cy.request('GET', '/store/inventory')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('available')
        expect(response).to.have.property('headers')
      })
  })

  it('Create user', () => {
    cy.request('POST', 'user', userBody)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.deep.include({ message: userBody.id.toString() })
        expect(response).to.have.property('headers')
      })
  })

  it('Get user by user name', () => {
    cy.request('GET', 'user/' + userName)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.deep.include(userBody)
        expect(response).to.have.property('headers')
      })
  })

  it('Creates list of users with given input array', () => {
    cy.request('POST', '/user/createWithArray', usersArray)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.deep.include({ message: 'ok' })
        expect(response).to.have.property('headers')
      })
  })

  it('Creates list of users with given input list', () => {
    cy.request('POST', '/user/createWithList', usersArray)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.deep.include({ message: 'ok' })
        expect(response).to.have.property('headers')
      })
  })
})
