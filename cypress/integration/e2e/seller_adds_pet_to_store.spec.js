var petId

describe('Store owner', () => {
  it('adds a new pet to store', () => {
    cy
      .request('POST', '/pet', {
        'name': 'Ciapek',
        'photoUrls': [
          'https://ujeb.se/YYHsU'
        ],
        'category': {
          'name': 'dog'
        },
        'status': 'available'
      })
      .then((response) => {
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

    cy.fixture(fileName, 'binary').then( (excelBin) => {
      Cypress.Blob.binaryStringToBlob(excelBin, fileType).then((blob) => {
        const formData = new formData();
                formData.set('file', blob, fileName);
                cy.form_request(method, endpointUrl, failOnStatusCode = true, formData, function (response) {
                  expect(response.status).to.eq(200); 
                });
      })
    })
  })
})
