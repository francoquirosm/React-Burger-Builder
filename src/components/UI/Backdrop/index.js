import React from "react";
import classes from "./styles.css";
const Backdrop = ({ show, clicked }) =>
  show && <div className={classes.Backdrop} onClick={clicked}></div>;

export default Backdrop;
