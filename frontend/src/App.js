import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
//must bring in Routes and Route when using V6 of the react router dom
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//2 import statements above needed to use toast container
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
    <Router> 
    {/* create routes in router tag */}
      <div className = 'container'>
        <Header /> 
        {/* imports Navigation Header at top of page */}
        <Routes> 
        {/* Here is where we put each route */}
          {/* set 'element' to whatever jsx you want (V6). Must import relevant pages to work*/}
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
