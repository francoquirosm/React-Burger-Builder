import React from "react";
import classes from "./styles.css";
const Backdrop = ({ show, onClick }) =>
  show && <div className={classes.Backdrop} onClick={onClick}></div>;

export default Backdrop;
