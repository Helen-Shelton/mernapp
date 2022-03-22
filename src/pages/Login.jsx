//create login form 
//similar to register form but it is validating not creating a user

import {useState, useEffect} from 'react'
// bring in 'useState' for form fields, each one with a component level state
import {FaSignInAlt} from 'react-icons/fa'
//import favicon icons
//similar import statements as register (below)
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  //Define states for the form:
  const[formData, setFormData] = useState({
    //'formData' (object) defines component level states. 
    //(Could have each field in a separate state)
    email: '',
    password: '',
  })

  //destructure fields from state above
  const { email, password} = formData

  //similar to register form
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  //similar to register form
  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){ 
      navigate('/') 
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

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

    const userData  = {
      email,
      password,
    }

    dispatch(login(userData))
  }//add jsx docs
  
  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className='heading'> 
        <h1>
          <FaSignInAlt /> Login
        </h1> 
        <p>Login and start setting goals!</p>
      </section>
      
      <section className='form'>
        <form onSubmit={onSubmit}>
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
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login