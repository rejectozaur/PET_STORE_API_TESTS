// let url = 'https://petstore.swagger.io/v2/' // 
let pet = null

describe('Order management process:', () => {
    it.only('looks for and oders some available pet ', () => {
        cy
            .request('GET', '/pet/findByStatus?status=available') // testowanie base_url
            .then((response) => {
                expect(response.status).to.eq(200)
                pet = response.body[0]
                cy.log(pet.id)
            }) 
    })   

    it('places an order for the pet ', () => {
        cy
            .request('POST', 'store/order', {
                'petId': pet.id,
                'quantity': 1,
                'shipDate': '2020-08-18T05:28:31.610Z',
                'status': 'placed',
                'complete': true
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.deep.include({status: 'placed', complete: true})
            })
    })

    it('odered pet\'s status gets updated to "pending order"', () => {
        cy
            .request({
                method: 'POST', 
                url: 'pet/' + pet.id, // using update with form data endpoint
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'accept': 'application/json'
                },
                body: {
                'id': pet.id,
                'name': pet.name,
                'status': 'pending'
                }
            })
            .then((response) => {      
                expect(response.status).to.eq(200)
            })
        cy
            .request({method: 'GET', url: 'pet/' + pet.id}).then((response) => {
                expect(response.body).to.deep.include({name: pet.name, status: 'pending'})
            })
    })

    it('purchased pet\'s status gets updated to "purchased"', () => {
        cy
            .request('PUT', 'pet', { // using plain update endpoint
                'id': pet.id,
                'name': pet.name,
                'status': 'purchased'
            })
            .then((response) => {
                expect(response.status).to.eq(200)         
                expect(response.body).to.deep.include({name: pet.name, status: 'purchased'})
            })
    })

    it('deletes this pet from the store', () => {
        cy
            .request('DELETE', 'pet/' + pet.id).then((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('verifies this pet is no longer displayed to users', () => {
        cy
            .request({method: 'GET', url: 'pet/' + pet.id, failOnStatusCode: false}).then((response) => {
                expect(response.status).to.eq(404)
                expect(response.body).to.deep.include({message: 'Pet not found'})
            })
    })
})