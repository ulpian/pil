/**
 * Routed Koa server with koa-mount
 *
 */
'use strict';

let koa = require('koa'),
    mount = require('koa-mount'),
    Router = require('koa-router'),
    bodyParser = require('koa-bodyparser'),
    pil = require('../lib/pil'),
    app = koa()

// Capturing post body
app.use(bodyParser())

// Routes for test app
let test = new Router()

app.use(mount('/', test.middleware()))

/*
* Looking for optional parameter
*/
test.get('/',
pil.set([
    {
        name: 'nothing',
        type: 'number',
        required: false
    }]),
function * () {
    this.body = "hello world"
})

/*
* Looking for parameters with different level of options on GET request
*/
test.get('/get',
pil.set([
    {
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
    }]),
function * () {
    this.body = this.request.params
})

/*
* Looking for different types parameters on POST request
*/
test.post('/post',
pil.set([
    {
        name: "post"
    },{
        name: "hey",
        type: "object"
    },{
        name: "arr",
        type: "array"
    }]),
function * () {
    this.body = this.request.params
})

// Export app for testing
module.exports = app

app.listen(3001)