import React from "react";
import classes from "./styles.css";
import burgerLogo from "../../../assets/burger-logo.png";

const Logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default Logo;
