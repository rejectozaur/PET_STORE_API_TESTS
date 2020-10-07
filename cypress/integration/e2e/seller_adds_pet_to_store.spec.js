let petId

describe('Store owner', () => {
  let body = {
    "category": {
      "id": 0,
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

  before(() => {
    cy.request('POST', '/pet', body)
      .then((response) => {            
        expect(response.status).to.eq(200)
     })
  })

  it('adds a new pet to store', () => {
    cy.request('POST', '/pet', {
      'name': 'Ciapek',
      'photoUrls': [
        'https://ujeb.se/YYHsU'
      ],
      'category': {
        'name': 'dog'
      },
      'status': 'available'
    }).then((response) => {
      expect(response.status).to.eq(200)
      petId = response.body.id
      expect(response.body).to.deep.include({name: 'Ciapek', status: 'available'})
    })
  })

  it('uploads an additional photo to pet\'s gallery', () => {
    const fileName = 'dog.png';
    const method = 'POST';
    const endpointUrl = '/' + petId + '/uploadImage'
    const fileType = 'multipart/form-data';

    cy.fixture(fileName, 'binary').then( (petBin) => {
      Cypress.Blob.binaryStringToBlob(petBin, fileType).then((blob) => {
        const formData = new formData();
                formData.set('file', blob, fileName);
                cy.form_request(method, endpointUrl, failOnStatusCode = true, formData, function (response) {
                  expect(response.status).to.eq(200); 
                });
      })
    })
  })
})
