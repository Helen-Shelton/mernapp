const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next) => {
    let token

    /*
    'req.headers' to access headers in Express
    '.authorization' to check if it is authorized
    check for authorization header and make sure its a bearer token
    */
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){ 
    //'.startsWith' is a JS method
        try {
            //Get token from auth header:
            token = req.headers.authorization.split(' ')[1] 
            //.split splits a string into substrings using the specified separator, 
            //and returns them as an array. Since we only want the token we specify 
            //it as the position [1] in the split array.

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            /*
            Get user from token (id stored in payload) ==> decoded in the verify token step.
            Remove password for security ==> '.select' specifies which document fields to + or - (also known as the query "projection")
            Assign it to 'req.user', so we can access 'r'eq.user' in any protected route
            */
            req.user = await User.findById(decoded.id).select('-password')

            next() //calls the next piece of middleware
        } catch (error) { //if something goes wrong in the 'try' portion of code
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    } 
    if (!token) { //if no token detected at all
        res.status(401)
        throw new Error('Not Authorized, no token')
    }

})

module.exports = {protect}

/*
Remember that authorization is sent through the headers!
in HTTP headers you have an authorization object which must be checked.
When token is sent in authorization header, is it formated like: 
    Bearer ljsdhfkalsjdhf   ==> where 'ljsdhfkalsjdhf' is the token

Add 'protect' module to routes in 'userRoutes.js' (or anywhere else deemed necessary)
*/