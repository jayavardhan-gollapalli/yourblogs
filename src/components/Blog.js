import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { reading, readingBlog } from "../features/blogSlice";
import '../App.css'
import { useDispatch, useSelector } from "react-redux";
import { readit } from "../features/blogSlice";
import { logged } from "../features/userSlice";

const Blog = (props) => {
  const {id}=useParams();
  const dispatch=useDispatch();
  let edit=useSelector(readit);
  let loggedin = useSelector(logged);
  let blog= useSelector(reading);
  useEffect(()=>{
    console.log("first use effect is running",blog)
    dispatch(readingBlog(id));
  },[])
  return (
    <div className="container">
      {loggedin && edit && <span>you can edit this</span>}
      {!blog.loading && !blog.errors &&
      <div>
        <h1>{blog.blog.title}</h1>
        <div><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
          { 
            blog.blog.tags.map((element,index)=>{
              return index<3 && <span className="mx-1 my-1" key={index}>{element.slice(0,10)}</span>
            })
          }
          </div>
        <p>{blog.blog.description}</p>
        <i>~{blog.blog.author}</i>
      </div>
      }
    </div>
  );
};

Blog.propTypes = {};

export default Blog;
