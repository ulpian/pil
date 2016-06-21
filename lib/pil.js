// PIL lib
'use strict';

// Internal library
let url = require('url')

/*
* Main pil function
*/
function pil () {}

/*
* Main util function
*/
function util () {}

/*
method - will have to pick up from koa-router or context itself
required - true is this parameter is required (returns 400 error in case parameter is not provided) - false, parameter is optional
type - String (with one of the type choices) or an Array is parameter can take multiple type, by default it is string

Issues;
    - missing
    - wrong type
*/

// Example parameter schema
// const psch = {
//     params: [
//         {
//             name: String,
//             required: Boolean,  // Required by default
//             type: [String || Number ...],   // String | Number | Array | Object or an Array that the parameter may be possibly taking more than one type
//             // Errors - array of error messages that will show up
//             error: {
//                 missing: String,  // Error message when parameter is not provided but is required
//                 incorrectType: String   // Error message if parameter is the wrong type
//             }
//         }
//         ...
//     ]
// }


//
// - support Sub objects
// - issue with same named parameters in stack - need to differenciate routes

// Returns true or false on success of failure
util.checkType = function (type,val) {
    let typeValid = false

    // Check for types
    switch (type) {
        // - string is straight-forward
        case "string":
            if (typeof(val) === "string") {
                typeValid = true
            }
            break

        // - number needs parsing
        case "number":
            if (parseInt(val) !== NaN) {
                typeValid = true
            }
            break

        // - arrays are objects in js so we can check length
        case "array":
            if (typeof(val) === "object" && parseInt(val.length) !== NaN) {
                typeValid = true
            }
            break

        // - simple objects are straight-forward
        case "object":
            if (typeof(val) === "object") {
                typeValid = true
            }
            break

        // - bools are straight-forward
        case "object":
            if (typeof(val) === "boolean") {
                typeValid = true
            }
            break

        default:
            if (typeof(val) === paramOpt.type) {
                typeValid = true
            }
            break
    }

    return typeValid
}

// Returns object of parameters from koa request object
util.params = function (req) {
    // Check for method types to catch parameters
    if (req.method === 'GET' || req.method === 'DELETE') {
        return url.parse(req.url, true).query
    } else if (req.method === 'POST' || req.method === 'PUT') {
        // Check that body is in this.req
        if (!req.body) {
            throw new Error('no body found for this ' + req.method + ' method, please use koa-bodyparser (or similar) in your koa app.')
        }
        return req.body
    }
}

// Core set function
pil.set = function (opts) {
    // Class variables to set
    let params = {}

    // Check params
    return function * (next) {
        try {
            params = util.params(this.request)
        } catch (error) {
            this.throw(500, error)
        }

        // Run through options
        for (let paramOpt of opts) {

            // Make sure options are correct
            if (!paramOpt.name) {
                this.throw(500, "Parameter must have a name.")
            }
            if (!paramOpt.type) {
                paramOpt.type = "string"
            }

            // Set variables
            let required = null,
                error = null

            // Check for required
            if (paramOpt.required) {
                required = paramOpt.required
            } else {
                required = true
            }

            let keys = Object.keys(params)

            // Check that parameter exists
            if (keys.indexOf(paramOpt.name) !== -1) {

                // Set key
                let k = keys[keys.indexOf(paramOpt.name)]
                let v = params[k]

                // Match parameters
                if (k === paramOpt.name) {

                    // Checking parameter type
                    let typeValid = util.checkType(paramOpt.type,v)

                    // Check for type
                    if (!typeValid) {
                        // Set error message
                        if (paramOpt.error && paramOpt.error.incorrectType) {
                            error = paramOpt.error.incorrectType
                        } else {
                            error = paramOpt.name + " parameter needs to be a " + paramOpt.type + " not a " + typeof(v) + "."
                        }
                        // Error for missing parameters
                        this.throw(400, error)
                    }
                }

            } else if (keys.indexOf(paramOpt.name) !== -1 && required === true) {
                // Set error message
                if (paramOpt.error && paramOpt.error.missing) {
                    error = paramOpt.error.missing
                } else {
                    error = "You need to provide the " + paramOpt.name + " parameter to this endpoint."
                }
                // Error for missing parameters
                this.throw(400, error)
            }
        }

        if (next) yield next
    }
}

// Check method and populate parameters
// for get and for post get parameters and check if req.body is used

module.exports = pil
