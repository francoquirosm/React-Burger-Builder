import React from "react";
import classes from "./styles.css";

const DrawerToggle = ({ clicked }) => (
  <div onClick={clicked} className={classes.DrawerToggle}>
    <div />
    <div />
    <div />
  </div>
);

export default DrawerToggle;
