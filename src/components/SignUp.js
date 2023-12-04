import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const SignUp = (props) => {
  const [show, setShow] = useState(false);
  const signup = props.close;
  const change = (event) => {
    setDetails({ ...details, [event.target.id]: event.target.value });
  };
  let [details, setDetails] = useState({ email: "",name:"", password: "" });

  const handleClose = () => {
    setShow(false);
    signup();
  };
  const handleShow = () => {
    setShow(true);
  };
  const submit=()=>{
    console.log(details);
  }
  useEffect(() => {
    setShow(props.view);
  }, []);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <form className="container">
          <div class="mb-3 mx-1 my-4">
          <input
                placeholder="Enter your name"
              type="string"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 mx-2">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Eg. jay@gmail.com"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 mx-2">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Choose a strong password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check"></div>
        </form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleClose(); submit()}}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignUp;
