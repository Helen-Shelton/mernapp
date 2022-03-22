const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
//note mongoose and bcrypt are asynchronous so we must import async handler
const asyncHandler = require('express-async-handler') //handles exceptions
const User = require('../models/userModel') //import user model/schema



//@desc     Register New User
//@route    POST  /api/users
//@access   Public: cant access protected route without being logged in, 
//                  & cant log in without being registered
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body //we deconstruct body data from client request when client registers
    
    if (!name || !email || !password) { //throw error if body data missing
        res.status(400)
        throw new Error('Please add all fields') 
    }

    //check if user exists by their email, which is a 'User' model property
    const userExists = await User.findOne({email}) 
    
    if (userExists) { //if there is already a user with that email throw error
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password using bcrypt
    const salt = await bcrypt.genSalt(10) //generate salt 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt)//hash the password with the salt

    //Create new user
    //put deconstructed body data from user registration input into new 'user' document
    //NOTE: every new document created is unique to that user
    const user = await User.create({ 
        name,
        email,
        password: hashedPassword, //make sure to store encrypted password
    })

    //Return info as Response to Client
    if (user) { 
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id), //calls generateToken()
            //user data that is passed back after creating new document
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})



//@desc     Login/Authenticate a User
//@route    POST  /api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
    const{email, password} = req.body //take the 2 inputs (email and password) from body of request

    const user = await User.findOne({email}) //check if this user exists in our collection of User documents

    /*
    bcrypt.compare() will compare the password the user enters (plaintext) 
    with the password in the database (hashed) 
    */
    if ( user && (await bcrypt.compare(password, user.password)) ){ //if both are valid/true
        res.json({ //send JSON response with user data to client
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})



//@desc     Get User Data
//@route    GET  /api/users/me : gets current logged in user. 
//                               Uses id from JWT token sent
//@access   Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
    //can simply return req.user because it has already been found in authMiddleware.js
})



//Generate JWT (needed for registerUser() and loginUser())
//takes in 'id' as argument because that is what is being sent in the payload
const generateToken = (id) => { 
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',//expires in 30 days
    }) 
    /* using .sign method (json webtoken package) signs a new token, 
    arguments: payload (user id), secret (defined in .env), options
    */
}



module.exports = {
    registerUser,
    loginUser,
    getMe,
}


/*
AUTHENTICATION & ENCRYPTION

How Encryption works: https://www.youtube.com/watch?v=fbSVgC8nGz4

BCRYPT: is a hashing algorithm used to encrypt sensitive information (passwords, documents, etc)
        it is designed to be slower than other algorithms so that it is harder to hack
        using a brute force method.
        https://www.npmjs.com/package/bcryptjs
        Simple video on Bcrypt: https://www.youtube.com/watch?v=O6cmuiTBZVs
ASIDE:  other hashing algorithm include md5, sha1, etc.

SALTS:  short, random sets of characters appended to the end 
        of a user's password before it is hashed. This ensures every user's 
        password is unique, even if they are the same in plaintext.

        Salt's are usually stored in plain text along with the hashed output 
        so the website knows what salt to use when verifying login.

    ex. const salt = await bcrypt.genSalt(10) 

        Hashing, Salts & Peppers explained: https://www.youtube.com/watch?v=--tnZMuoK3E
                                            https://www.youtube.com/watch?v=cczlpiiu42M

To protect our routes, we can use middleware (authMiddleware.js) to check the tokens 
during the req/res cycle (when a request to a route has been sent).

        
                      






*/