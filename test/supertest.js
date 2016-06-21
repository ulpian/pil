// Super test of pil in action
'use strict';

let app = require('./app')
let request = require('co-supertest').agent(app.listen())
let expect = require('chai').expect

// Test different routes
describe('Test API routes', () => {
    let opts = {}

    // Authenticate
    before(function * () {
        // Set some various parameter options
    })

    // Root page
    describe('/', function () {

        it('should test simple GET with no params', function * () {
            let res = yield request.get('/')
                                .expect(200)
                                .end()

            let match = res.text.match(/hello world/g)

            if (match === null || match.length < 0) {
                throw new Error('Page not returning correct message.')
            }
        })

        it('should test a GET request', function * () {
            let res = yield request.get('/get/?foo=bar&hello=1')
                                .expect(200)
                                .end()
        })

        it('should test a POST request', function * () {
            let res = yield request.post('/post')
                                .send({
                                    post: 'bar',
                                    hey: {hey:2},
                                    arr: [1,2,'hey']
                                })
                                .expect(200)
                                .end()
        })
    })

    after(() => {
        // Wipe token, data
        opts = null
    })
})