import React, { useEffect } from "react";
import PropTypes from "prop-types";
import '../Style/Styling.css'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';


const BlogPreview = (props) => {
  useEffect(()=>{
    console.log(props.id);
  })
  return (
    <div className="mx-2 my-2 blogPreview">
      <div className="card" >
        <div className="card-body">
          <h5 className="card-title mx-2 my-2">{props.title}</h5>
          <div><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
          { 
            props.tags.map((element,index)=>{
              return index<3 && <span className="mx-1 my-1" key={index}>{element.slice(0,10)}</span>
            })
          }
          </div>
          <p className="card-text">
            {props.description.slice(0,370)}
            {props.description.length<=370? '': "...."}
          </p>
          <div className="dTime">{props.date.slice(11,16)}|{props.date.slice(0,10)}</div>
          { props.author?<div className="mx-1 my-1"><i><b>{props.author}</b></i></div>:""}
          <div className="readMore">
            <Link to={`/blog/${props.id}`} >
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogPreview.propTypes = {};

export default BlogPreview;
