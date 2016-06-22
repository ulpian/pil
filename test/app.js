/**
 * Example Koa server with using simply check for routing
 *
 */
'use strict';

let koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    pil = require('../lib/pil'),
    app = koa()

// Capturing post body
app.use(bodyParser())

/*
* Looking for optional parameter
*/
app.use(function * (next) {
    if (this.request.url === '/') {

        // Check parameters
        yield pil.set([{
            name: 'nothing',
            type: 'number',
            required: false
        }])

        this.body = "hello world"
    } else {
        yield next
    }
})

/*
* Looking for parameters with different level of options on GET request
*/
app.use(function * (next) {
    // Checking for get param
    let getRoute = this.request.url.match(/\/get\//g)
    if (getRoute && getRoute.length !== 0 && this.request.method === 'GET') {

        // Check parameters
        yield pil.set([{
            name: "foo",
            required: true,
            type: "string",
            error: {
                missing: "You need to provide foo otherwise the world will break"
            }
        },{
            name: "hello",
            type: "number"
        },{
            name: "email",
            regex: /@/g
        }])

        this.body = this.request.params
    } else {
        yield next
    }
})

/*
* Looking for different types parameters on POST request
*/
app.use(function * (next) {
    if (this.request.url === '/post' && this.request.method === 'POST') {

        // Check parameters
        yield pil.set([{
            name: "post"
        },{
            name: "hey",
            type: "object"
        },{
            name: "arr",
            type: "array"
        }])

        this.body = this.request.params
    } else {
        yield next
    }
})

// Export app for testing
module.exports = app

app.listen(3000)