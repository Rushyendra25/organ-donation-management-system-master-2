import React from 'react'
import './Nav.css'
import { useSelector,useDispatch } from 'react-redux'
import authActions from '../../store/authslice'
import {Link, useNavigate} from 'react-router-dom'
function Nav() {
  let navigate=useNavigate()
  const dispatch=useDispatch()
  const isloggedIn=useSelector(state=>state.auth.isloggedIn)
  const logout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    dispatch(authActions.logout())
    navigate('/')
  }
  <style>
@import url('https://fonts.googleapis.com/css2?family=Alegreya+SC:wght@500&display=swap');
</style>
  return (
    <nav className="navbar navbar-expand-md navbar-light  ">
  <Link className="navbar-brand" to="/"> <img src="data:image/png;base64,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" alt="" width={"150px"} /></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto ">
    <li className="nav-item active">
        <Link className="nav-link mx-3 text-white  navbarlinks"  to="/">Home</Link>
      </li>
      {
       isloggedIn &&
      <li className="nav-item active">
        <Link className="nav-link mx-3 text-white navbarlinks" to="/createUser">Donation Form</Link>
      </li>
      }
      {
       !isloggedIn &&
      <li className="nav-item active">
        <Link className="nav-link mx-3 text-white navbarlinks" to="/login">Login</Link>
      </li>
      }
      {
        !isloggedIn &&
      <li className="nav-item active">
        <Link className="nav-link mx-3 text-white navbarlinks"  to="/register">Register</Link>
      </li>
      }
      {
        isloggedIn &&
      <li className="nav-item">
        <Link className="nav-link mx-3 text-white navbarlinks" to="/userList">Donar List</Link>
      </li>
     }
     {
        isloggedIn &&
      <li className="nav-item">
        <Link className="nav-link mx-3 text-white navbarlinks" to="/profile">Profile</Link>
      </li>
     }
     {
        isloggedIn &&
      <li className="nav-item">
        <Link className="nav-link mx-3 text-white navbarlinks" to="/dashboard">Dashboard</Link>
      </li>
     }
     
    <li className='nav-item text-white'>
    {
    isloggedIn && <button className='btn btn-light mx-4' onClick={logout}>Log out</button>
    }
      </li> 
    </ul>
    
  </div>
</nav>
  )
}

export default Nav;