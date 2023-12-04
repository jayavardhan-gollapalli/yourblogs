import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/userSlice";
import { getUserBlogs } from "../features/blogSlice";

const Login = (props) => {
  const [show, setShow] = useState(false);
  const login = props.close;
  const dispatch= useDispatch();
  let [credentials, setCredentials]=useState({email:'',password:''});

  const handleClose = () => {
    setShow(false);
    login();
  };
  const handleShow = () => {
    setShow(true);
  };

  const change=(event)=>{
    setCredentials({...credentials,[event.target.id]:event.target.value});
  }

  const submit=()=>{
    dispatch(loginUser(credentials));
    dispatch( getUserBlogs() );
  }

  useEffect(() => {
    setShow(props.view);
  }, []);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <form className="container">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
            placeholder="Enter your email"
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              value={credentials.email}
              onChange={change}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
            placeholder="Enter your password"
              type="password"
              className="form-control"
              id="password"
              value={credentials.password}
              onChange={change}
            />
          </div>
          <div className="mb-3 form-check">
          </div>
        </form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleClose(); submit();}}>
            Log In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
