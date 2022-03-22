//This is strictly for making HTTP request, sending data back, and setting data in local storage

import axios from 'axios' 
//used for http request, like postman but from within application

const API_URL = '/api/users/'
/*
remember to add a proxy to the FRONTEND package.json:
"proxy": "http://localhost:5000",
this means it will look at localhost:5000 and then go to '/api/users/' 
which is the correct endpoint
*/

//Register User
const register = async (userData) => {
    const response = await axios.post(API_URL, userData) 
    //makes request to register user

    //.data is the object where axios puts the response data 
    if(response.data) { //if data is returned
        localStorage.setItem('user', JSON.stringify(response.data))
        //store response data (includes token) in local storage for the specified Item, called 'user'
        //remember local storage MUST contain strings, hence JSON.stringify()
    }

    return response.data
}

//login user (similar to register)
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData) 
    //connects to login endpoint of backend

    if(response.data) { 
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//logout user
const logout = () => {
    localStorage.removeItem('user')
}
//Note: the harder (and more valid) method of logging out 
//is to use the server to send an http only cookie

//export statements:
const authService = {
    register,
    logout,
    login,
}//collection of functions we want to export

export default authService