import React from "react";
import classes from "./styles.css";

const Button = (props) => (
  <button
    disabled={props.disabled}
    onClick={props.clicked}
    className={[classes.Button, classes[props.btnType]].join(" ")}
  >
    {props.children}
  </button>
);

export default Button;
