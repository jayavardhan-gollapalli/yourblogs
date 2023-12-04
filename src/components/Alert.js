import React from "react";
import PropTypes from "prop-types";

const Alert = (props) => {
    return (
    <div className="alert">
    {props.message &&<div className="">
      <div className={`alert alert-${props.type}`} role="alert">
        {props.message}
      </div>
    </div>}
</div>
  );
};

export default Alert;
