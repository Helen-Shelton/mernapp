/* Create Header (at top of pages) for navigation

Install react icons to frontend:
cd frontend
npm i react-icons

*/

import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa' //imports icons from Font Awesome (fa)
import {Link, useNavigate} from 'react-router-dom' //use to have links to your pages
import {useSelector, useDispatch} from 'react-redux' //import to access states to get user
import {logout, reset} from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth) //from the state we want the user
    //state.auth means we want user from the auth state

    const onLogout = () =>{
        dispatch(logout())
        dispatch(reset())
        navigate('/') //navigate back to dashboard on logout
    } 
    //remember to go back to reducer (authSlice.js)and add a case for logging out,
    //or else logout btn & user cache will not be removed until we reload

    return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>GoalSetter</Link>
        </div>
        <ul> 
            {user ? ( 
                <li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt/> Logout
                    </button> 
                </li>
            ) : (
                <>
                    <li>
                        <Link to='/login'>
                            <FaSignInAlt/> Login
                        </Link> 
                    </li>
                    <li>
                        <Link to='/register'>
                            <FaUser/> Register
                        </Link> 
                    </li>
                </>)}
        </ul> 
    </header>
    )
}
//{user ? ():()} if true (logged in) show logout button, if false show other 2 buttons

export default Header