//creates register form

import {useState, useEffect} from 'react'
// bring in 'useState' for form fields, each one with a component level state
import {useSelector, useDispatch} from 'react-redux'
/*
'useSelector' selects something from the state (pending, fulfilled, rejected (error) state)
'useDispatch' dispatches functions like register, asyncThunk function, or reset in the reducer
specified in authSlice.js
*/
import {useNavigate} from 'react-router-dom'
//allows us to redirect
import {toast} from 'react-toastify'
//go to FRONTEND App.js for more
import {FaUser} from 'react-icons/fa'
//import favicon icons
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  //Define states for the form:
  const[formData, setFormData] = useState({
    //'formData' (object) defines component level states. 
    //(Could have each field in a separate state)
    name: '',
    email: '',
    password: '',
    password2: '',//confirm password
  })

  //destructure fields from state above
  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
  //destructures states and selects what we want from our state
  //'state.auth' is a global state 


  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    if(isSuccess || user){ //if successfully registered or logged in
      navigate('/') //navigate to dashboard (redirected)
    }

    dispatch(reset())
    //reset states after everything has been checked ('reset' in authSlice.js)

  }, [user, isError, isSuccess, message, navigate, dispatch])
//effect function (effect-arg 1) will only be triggered if anything 
//in the dependency list (dep-arg 2) changes


  //When a user types into a field box, it triggers event onChange() 
  //which will update the states based on user input
  //call setFormData to store input as form data
  const onChange = (e) => {
    setFormData((prevState) => ({
      // this is one object, not multiple, so we dont need to write setEmail, setPassword, etc.
      ...prevState, //spread across all fields of the previous state
      [e.target.name]: e.target.value, 
      //e.target.name: key 'name' specifies the different states by name
      //e.target.value: what the user types in
      //this should allow us to now type into the boxes
    }))
  }
 
  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2){ //check passwords match
      toast.error('Passwords do not match')
    }else{ //register user (register function takes in user data)
      const userData = {
        name,
        email,
        password,
      } //make object that takes in data from register form

      dispatch(register(userData)) 
      //register fxn from authSlice.js
    }
  }
  //add jsx docs

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className='heading'> 
        <h1>
          <FaUser /> Register
        </h1> 
        <p>Please create an account</p>
      </section>
      
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input 
              type='text' 
              className='form-control' 
              id='name' 
              name='name' 
              value={name} 
              placeholder='Enter your name' 
              onChange={onChange} 
            />
            {/* 'value' takes in the variable that was destructured from the state (from form data) */}
          </div>
          <div className='form-group'>
            <input 
              type='email' 
              className='form-control' 
              id='email' 
              name='email' 
              value={email} 
              placeholder='Enter your email' 
              onChange={onChange} 
            />
          </div>
          <div className='form-group'>
            <input 
              type='password' 
              className='form-control' 
              id='password' 
              name='password' 
              value={password} 
              placeholder='Enter your password' 
              onChange={onChange} 
            />
          </div>
          <div className='form-group'>
            <input 
              type='password' 
              className='form-control' 
              id='password2' 
              name='password2' 
              value={password2} 
              placeholder='Confirm your password' 
              onChange={onChange} 
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register