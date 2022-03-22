/* Add extension 'ES7+ React/Redux/React-Native snippets ' so that we can create snippets and shortcuts
ex.
'rfce' --> ReactFunctionalExportComponent. Builds template according to page (see below):
import React from 'react'
function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}
export default Dashboard

REACT ROUTER SETUP (FRONTEND)
remember to install router to front end:
Terminal: cd frontend -->go to frontend folder
          npm i react-router-dom --> installs router to front end
*/

import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom' //to redirect user
import {useSelector, useDispatch} from 'react-redux' //to grab user from state to confirm if we are logged in 
import GoalForm from '../components/GoalForm' //to display goals in dashboard
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import {getGoals, reset} from '../features/goals/goalSlice'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  //remember that useSelector() takes in a function, and that function takes in a state
  //the user is coming from state.auth
  const {goals, isLoading, isError, message} = useSelector((state) => state.goals)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if(!user) {
      navigate('/login')
    }
    //redirects the user away from the dashboard page if they are logged out

    dispatch(getGoals()) //fetches goals from backend and puts it in 'goals'

    return () => { 
      dispatch(reset())
    }
    //goals clear when we leave dashboard
    //'do something when component unmounts'

  }, [user, navigate, isError, message, dispatch])

  //spinner
  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1> 
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (<h3>You have not set any goals!</h3>)}
      </section> 
    </>
  )
}
// {user && user.name} means "if user, then user.name". Accesses and displays user name 
// show goals from GoalForm.jsx 
/*
{goals.map((goal) => (
  <GoalItem key={goal._id} goal={goal} />
))}
for each goal item we will display a goal item component (GoalItem defined in components/GoalItem.jsx)
.map will call the callbackfn function 1 time for each element in the array
Here our array is 'goal'
*/

export default Dashboard
