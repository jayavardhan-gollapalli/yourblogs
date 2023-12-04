import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { allPublicBlogs, getPublicBlogs } from "../features/blogSlice";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import BlogPreview from "./BlogPreview";
import "../Style/Styling.css";
import Login from "./Login";
import { logged } from "../features/userSlice";
import { userDetails } from "../features/userSlice";

const Home = (props) => {
  const dispatch = useDispatch();
  let user = useSelector( userDetails );
  const loggedin=useSelector( logged );
  let publicBlogs = useSelector(allPublicBlogs);
  console.log("publicBlogs state",publicBlogs);
  console.log("user state", user);
  return (
    <div className="center">
      {loggedin && <svg
        xmlns="http://www.w3.org/2000/svg"
        className="addIcon"
        viewBox="0 0 448 512"
      >
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
      </svg>}
      <div className="flexbox">
        {!publicBlogs.loading && !publicBlogs.errors && publicBlogs.blogs.length>0 && publicBlogs.blogs.map((element) => {
          return (
            <BlogPreview
              title={element.title}
              description={element.description}
              author={element.author}
              id={element._id}
              tags={element.tags}
              date={element.date}
              key={element._id}
            />
          );
        })}
        {!publicBlogs.loading && !publicBlogs.errors && !publicBlogs.blogs.length && <div>There are no blogs for you to read</div> }
        {!publicBlogs.loading && publicBlogs.errors && <div>Some error ocurred while trying to fetch your feed {publicBlogs.errors.name}: {publicBlogs.errors.message}</div> }
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
