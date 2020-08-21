var uniqueNr = Date.now().toString()

describe('Basic user\'s operations:', () => {
    it('creates an account', () => {
        cy
            .request('POST', 'user', {
                'username': 'automated_tester_' + uniqueNr,
                'firstName': 'John',
                'lastName': 'Doe',
                'email': 'test' + uniqueNr + '@email.com',
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
            .request('GET', 'user/login', {
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
            .request('GET', '/' + 'user/logout', {
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.deep.include({message: 'ok'})
        })
    })
})
