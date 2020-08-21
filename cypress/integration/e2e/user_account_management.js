// TO DO
// naprawić base_url

let url = 'https://petstore.swagger.io/v2/' // az naprawie base_url
let unique_nr = Date.now().toString()

describe('Basic user\'s operations:', () => {
    it('creates an account', () => {
        cy
            .request('POST', url + 'user', {
                'username': 'automated_tester_' + unique_nr,
                'firstName': 'John',
                'lastName': 'Doe',
                'email': 'test' + unique_nr + '@email.com',
                'password': 'Password123!',
                'phone': '123 123 123',
                'userStatus': 0
            })
            .then((response) => { // response.body is automatically serialized into JSON
                expect(response.status).to.eq(200)
        })
    })

    it('logs user in into the system', () => {
        cy
            .request('GET', url + 'user/login', {
                'username': 'automated tester',
                'password': 'Password123!',
            })
            .then((response) => {
                expect(response.status).to.eq(200)   
                let regex = new RegExp(/[0-9]+/g)
                let returned_message = response.body.message
                let session_id = returned_message.match(regex)  
                expect(returned_message).to.deep.eql('logged in user session:' + session_id)
        })
    })

    it('logs user out', () => {
        cy
            .request('GET', url + 'user/logout', {
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.deep.include({message: 'ok'})
        })
    })
})
