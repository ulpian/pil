// test app (tapp) - Sample koajs application with pil test
'use strict';

let koa = require('koa'),
    mount = require('koa-mount'),
    bodyParser = require('koa-bodyparser'),
    pil = require('../lib/pil'),
    app = koa()

// pil
let url = require('url')

// Capturing post body
app.use(bodyParser())

/*
* Setting parameters that are not required
*/
app.use(pil.set([{
    name: 'nothing',
    type: 'number',
    required: false
}]))

// Example root parameter GET
app.use(function * (next) {
    if (this.request.url === '/') {
        this.body = "hello world"
    } else {
        yield next
    }
})

/*
* Looking for 'foo' and 'bar parameters on GET request
*/
app.use(pil.set([
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
    }
]))

// Example koa GET request
app.use(function * (next) {
    // Checking for get param
    let getRoute = this.request.url.match(/\/get\//g)
    if (getRoute && getRoute.length !== 0 && this.request.method === 'GET') {
        this.body = "Get endpoint"
    } else {
        yield next
    }
})

/*
* Looking for 'foo' and 'bar parameters on POST request
*/
app.use(pil.set([
    {
        name: "post"
    },{
        name: "hey",
        type: "object"
    },{
        name: "arr",
        type: "array"
    }
]))

app.use(function * (next) {
    if (this.request.url === '/post' && this.request.method === 'POST') {
        this.body = "Post endpoint"
    } else {
        yield next
    }
})

// Export app for testing
module.exports = app

app.listen(3000)