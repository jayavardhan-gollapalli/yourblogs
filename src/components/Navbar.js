import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Alert from "./Alert";
import { useDispatch, useSelector } from "react-redux";
import { logged } from "../features/userSlice";
import { logout } from "../features/userSlice";

const Navbar = (props) => {
  const [showLogin,setShowLogin] =useState(false);
  const [showSignup,setShowSignup] =useState(false);
  const dispatch = useDispatch();
  let loggedin= useSelector( logged );
  
  const logOut=()=>{
    console.log("loggedin before",loggedin);
    dispatch(logout());
    console.log("loggedin",loggedin);
  }
  useEffect(()=>{
    console.log("loggedin after effect", loggedin)
  },[])
  const login=()=>{ 
    setShowLogin(!showLogin);
    console.log("Login is called");
  }
  
  const signup=()=>{
    setShowSignup(!showSignup);
    console.log("Signup is called");
  }

  const [alert,setAlert]=useState({type:"",message:""})
  return (
    <div>
      <Alert type={alert.type} message={alert.message} />
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/'>
            c-Blogs
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 container-fluid d-flex">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/yourBlogs'>
                  Your Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/unPublished'>
                  Un-Published
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/unPublished'>
                  Liked
                </Link>
              </li>
            </ul>
          {showLogin && <Login view={true} close={login} />}
          {showSignup && <SignUp view={true} close={signup} />}
          { loggedin &&  <button className="btn btn-primary d-flex-xx mx-1" style={{width:"100px"}} onClick={()=>{logOut();}} >Log out</button>}
          {!loggedin &&  <button className="btn btn-primary d-flex-xx mx-1" style={{width:"100px"}} onClick={()=>{signup();}} >Sign Up</button>}
          {!loggedin &&  <button className="btn btn-primary d-flex-xx mx-1" style={{width:"100px"}} onClick={()=>{login();}} >Log In</button>}
          </div>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;