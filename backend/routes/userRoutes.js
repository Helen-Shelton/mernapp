//Establish endpoints/user routes

//import statements 
const express = require('express')
const router = express.Router()
const { 
    registerUser,
    loginUser,
    getMe, 
} = require('../controllers/userController') //modules from user controller

const {protect} = require ('../middleware/authMiddleware') 
//import authentication middleware to use on protected routes


router.post('/', registerUser) //add resource
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router

/*
ENCRYPTION
To make our registerUser functionality (in userController.js), 
we need to encrypt our passwords and store the encryptions 
(never store plain text passwords, very easy to hack!)

To help encrypt we will use bcrypt and json webtokens: 
npm i bcryptjs
npm i jsonwebtoken

*/