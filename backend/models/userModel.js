const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        req: [true, 'Please add a name'],
    },
    email:{
        type: String,
        req: [true, 'Please add an email'],
        unique: true,
        //set to true because we dont want 2 of the same email adresses
    },
    password:{
        type: String,
        req: [true, 'Please add a password'],
    },
},
{
    timestamps: true
})


module.exports = mongoose.model('User', userSchema)
/*
We could add other stuff like phone number, admin roles, etc., 
whatever you may need a user to have

With every goal we must know which user created that goal, 
so we go back into goalModel.js and add a 'user' field/property
*/