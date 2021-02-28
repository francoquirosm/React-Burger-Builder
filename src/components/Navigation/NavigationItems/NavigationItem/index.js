import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./styles.css";

const NavigationItem = ({ link, children }) => (
  <li className={classes.NavigationItem}>
    <NavLink to={link} activeClassName={classes.active} exact>
      {children}
    </NavLink>
  </li>
);

export default NavigationItem;
