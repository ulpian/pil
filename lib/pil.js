// PIL lib
'use strict';

/*
* Main pil function
*/
function pil () {}

/*
method - will have to pick up from koa-router or context itself
required - true is this parameter is required (returns 400 error in case parameter is not provided) - false, parameter is optional
type - String (with one of the type choices) or an Array is parameter can take multiple type
*/

// Example parameter schema
const psch = {
    method: 'GET',
    params: [
        {
            name: String,
            required: Boolean,
            type: String / Array,   // String | Number | Array | Object or an Array that the parameter may be possibly taking more than one type
            // Errors - array of error messages that will show up
            error: [
                { issue: Number, message: String }
            ]
        }
        ...
    ]
}

// Core set function
pil.set = function (params) {
    // Check params
    return function * (next) {
        //
    }
}

module.exports = pil
