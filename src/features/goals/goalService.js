import axios from 'axios'

const API_URL = '/api/goals/'

//create new goal
const createGoal = async(goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    //variable 'config' has headers object (authorization header)
    //to send as 'Bearer token' we must use the format above

    const response = await axios.post(API_URL, goalData, config)
    //post request to API_URL, send goalData, pass in config (Bearer token for authorization)

    return response.data
}

//get user goals (to display on dashboard when logged in)
const getGoals = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

//delete goals
const deleteGoal = async(goalId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + goalId, config)

    return response.data
}

const goalService = {
    createGoal,
    getGoals,
    deleteGoal,
}

export default goalService