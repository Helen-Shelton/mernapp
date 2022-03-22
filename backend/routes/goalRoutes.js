const express = require('express')//import express (backend framework)
const router = express.Router() //create new Router object to handle client requests
const {
    getGoals, 
    setGoal, 
    updateGoal, 
    deleteGoal,
} = require('../controllers/goalController') 
//imports module goalController.js for routes, the ".." means to go 2 folders up

const {protect} = require('../middleware/authMiddleware') //import middleware module

router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)


module.exports = router

/*
We have specified 4 different routes above
In practice, to define our functions it is much better to use a new file called goalController.js

NOTE: the path (/api/goals) need not be specified because it already was in server.js
      Everytime we make a new route module, we must include: const router = express.Router()

Examples of simple routes (CRUD Methods) that can be placed inside this file
router.get('/', (req, res) =>{
    res.status(200).json({message: 'Get Goals' })
})
router.post('/', (req, res) =>{ //create a goal
    res.status(201).json({message: 'Set Goal' })
})
router.put('/:id', (req, res) =>{ //update goal
    res.status(200).json({message: `Update Goal ${req.params.id}` })
})
router.delete('/:id', (req, res) =>{
    res.status(200).json({message: `Delete Goal ${req.params.id}` })
})

When importing the controller module, it can be further simplified to 
router.get('/', getGoals)

router.post('/', setGoal)

router.put('/:id', updateGoal)

router.delete('/:id', deleteGoal)

and then further simplified to what is written above because 
.get & .post, as well as .put & .delete, have the same routes


*/
