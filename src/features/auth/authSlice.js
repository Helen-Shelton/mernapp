//where reducers and initial state go, that pertains to authentication

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
// Thunk functions allow us to have asynchronous functions and update our state
// we update our state with what we get back from the server, which is easier to do with redux toolkit
import authService from  './authService'


// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))
// remember that storage can only have strings, 
//so thats why we use .parse()

//User part of authentication
const initialState = {
    user: user ? user : null, //if there is a user in localStorage set to user, otherwise null
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Register user function
//async thunk function that deals with async data and backend
//uses a service file for http request
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
// arg1: string with the action
// arg2: asynchronous function, passed in a 'user' from the register page and thunkAPI used in the try/catch
    try{ 
        return await authService.register(user) 
        //this is where we make our request, use await because it will return a promise
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message) //thunkAPI method: rejects and sends error message as payload
    }
})

//login user (similar to register)
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try{ 
        return await authService.login(user) 
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message) //thunkAPI method: rejects and sends error message as payload
    }
})

//logout user
export const logout = createAsyncThunk('auth/logout', async ()=> {
    await authService.logout()
})

// create slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => { 
        //resets states to default values after registering
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
    //this is where we put our asynch 'Thunk' functions: pending, fulfilled, rejected (error) state
        builder 
            .addCase(register.pending, (state) =>{
                state.isLoading = true //when the register is pending, we are in a loading state (fetching data)
            })
            .addCase(register.fulfilled, (state, action) => { 
            //when register is fulfilled we get data back (user token, etc.), so 'action' must be done
                state.isLoading = false //no longer loading
                state.isSuccess = true
                state.user = action.payload
                //action.payload is returned from register function (above), which comes from authService
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload 
                //uses payload from thunkAPI.rejectWithValue(message) in catch portion of register() (above)
                //payload is response from the backend (message)
                state.user = null //no user created due to error
            })
            //login is same as register
            .addCase(login.pending, (state) =>{
                state.isLoading = true 
            })
            .addCase(login.fulfilled, (state, action) => { 
                state.isLoading = false 
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload 
                state.user = null 
            })
            .addCase(logout.fulfilled, (state) =>{
                state.user = null
            })
    }, 
})


export const {reset} = authSlice.actions
//reset must be exported separately so we can bring 'reset' into components
export default authSlice.reducer
//go into app/store.js to import authReducer