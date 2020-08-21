let url = 'https://petstore.swagger.io/v2/pet/' // az naprawie base_url
let pet_id

describe('Store owner', () => {
  it('adds a new pet to store', () => {
    cy
      .request('POST', url, {
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
          pet_id = response.body.id
          expect(response.body).to.deep.include({name: 'Ciapek', status: 'available'})
      })
  })

  it('uploads an additional photo to pet\'s gallery', () => {
    const fileName = 'dog.png';
    const method = 'POST';
    const endpoint_url = url + pet_id + '/uploadImage'
    const fileType = 'multipart/form-data';

    cy.fixture(fileName, 'binary').then( (excelBin) => {
      Cypress.Blob.binaryStringToBlob(excelBin, fileType).then((blob) => {
        const formData = new FormData();
                formData.set('file', blob, fileName);
                cy.form_request(method, endpoint_url, formData, function (response) {
                  expect(response.status).to.eq(200);
                });
      })
    })
  })
})

