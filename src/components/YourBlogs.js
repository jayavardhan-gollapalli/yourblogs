import React, { useEffect, useState } from "react";
import {
  getUserBlogs,
  myPrivateBlogs,
  myPublicBlogs,
} from "../features/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import "../Style/Styling.css";
import BlogPreview from "./BlogPreview";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import { logged } from "../features/userSlice";

const YourBlog = (props) => {
  // const [blogs, setBlogs]=useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const login = () => {
    setShowLogin(!showLogin);
    console.log("Login is called");
  };
  
  const signup = () => {
    setShowSignup(!showSignup);
    console.log("Signup is called");
  };
  useEffect(() => {
    console.log("Starting yourBlogs")
  }, []);
  let loggedin=useSelector(logged)
  let blogs = useSelector(myPublicBlogs);
  console.log("my blogs",blogs);
  console.log(loggedin)
  console.log("blogs loading",blogs.loading)
  return (
    <div className="center mx-3">
      {loggedin && !blogs.loading && !blogs.errors &&
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="addIcon"
            viewBox="0 0 448 512"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          <div className="flexbox">
            {blogs.blogs && blogs.blogs.map((element) => {
              return (
                <BlogPreview
                  title={element.title}
                  description={element.description}
                  tag={element.tag}
                  date={element.date}
                  key={element.user}
                />
              );
            })}
          </div>
        </>
      }
      {loggedin && !blogs.loading && !blogs.errors && !blogs.blogs.length && <div>You have no Published Blogs</div>}
      {loggedin && !blogs.loading && blogs.errors &&
        <>
          <p>Some error ocurred while fetching your blogs</p>
          <p>{blogs.errors.name}:{blogs.errors.message}</p>
        </>
      }
      {showLogin && <Login view={true} close={login} />}
      {showSignup && <SignUp view={true} close={signup} />}
      {!loggedin && (
        <div className="center">
          <h3 className="flexitem">
            You need to be signed in to view this page
          </h3>
          <button
            className="btn btn-primary d-flex-xx mx-1 my-2"
            style={{ width: "100px" }}
            onClick={() => {
              signup();
            }}
          >
            Sign Up
          </button>
          <button
            className="btn btn-primary d-flex-xx mx-1 my-2"
            style={{ width: "100px" }}
            onClick={() => {
              login();
            }}
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default YourBlog;
