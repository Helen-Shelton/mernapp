const asyncHandler = require('express-async-handler')//importing the asynchronous handler for the database

const Goal = require('../models/goalModel') 
//this imports mongoose methods used to create, read, etc. database
const User = require('../models/userModel') 



//@desc     Get goals 
//          gets all goals but after adding authentication will only get a specific user goal
//@route    GET  /api/goals  (request and URI)
//@access   Private (after adding authentication)
const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find({user: req.user.id})     //goals are stored in db through our mongoose model
    //we now have access to req.user because of the protect middleware added to route
    //We now have a user field on the goals, which is a relationship to the 'User' Model.

    res.status(200).json(goals)
})



//@desc     Set goals 
//@route    POST  /api/goals 
//@access   Private (after adding authentication)
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text){ 
        //if no body of text is found return client error
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({//.create creates new document/s for user body text
        text: req.body.text, 
        user: req.user.id //set a goal for a specific user using protected route
    })
    

    res.status(201).json(goal)
})



//@desc     Update goals 
//@route    PUT  /api/goals/:id   
//@access   Private (after adding authentication)
const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id) 
    //Find 'Goal' document by id. 

    if(!goal){ //if we cant find a goal for that user throw error
        res.status(400)
        throw new Error('Goal Not Found')
    }

    if (!req.user) {  //if we cant find user throw error
        res.status(401)
        throw new Error('User Not Found')
    }

    //Make sure logged in user matches the goals user that they're updating
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User Not Authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
    })
    /*
    update goal. 
    First argument is goal to be updated 
    second is what we are replacing it with (updated text)
    third is options object with property 'new' which we set to true
    */

    res.status(200).json(updatedGoal)
})



//@desc     Delete goals 
//@route    DELETE  /api/goals/:id   
//@access   Private (after adding authentication)
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id) 
    //get goal we are trying to update, id is in the url

    if (!goal) { //if we cant find the goal throw error
        res.status(400)
        throw new Error('Goal Not Found')
    }

    if (!req.user) {  //if we cant find that user throw error
        res.status(401)
        throw new Error('User Not Found')
    }

    //Make sure logged in user matches the goals user that they're updating
    if (goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User Not Authorized')
    }

    await goal.remove()

    res.status(200).json({id: req.params.id}) //return the id as an object so we can access later on front end
})


module.exports = {//allows our module to be used in other modules
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}

/*
ERROR HANDLING
Ex.
const setGoal = (req, res) => {
    if(!req.body.text){ 
        res.status(400).json({message: 'Please add a text field' })
    }
    res.status(201).json({message: 'Set Goal' })
}

Express has a built in error handler.
To overwrite the built in one use: (in goalController.js)
const setGoal = (req, res) => {
    if(!req.body.text){ 
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(201).json({message: 'Set Goal' })
}
and define the new error handler in a separate folder/file (errorMiddleware.js)


DATABASE
When we connect to the database, we will receive a "promise" from it.
For this reason we must add the .async() & .await(), to make them asynchronous

Note: if we used the .then() & .catch() syntax we would have to implement the .catch().
      Using async/await means we will have to use try/catch.
      If we dont want to use try/catch and want to just use the error handler,
      we can use a package called express-async-handler. 
      In new terminal: npm i express-async-handler




*/