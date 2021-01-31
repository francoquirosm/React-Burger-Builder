import React from "react";
import classes from "./styles.css";
const NavigationItem = ({ link, active, children }) => (
  <li className={classes.NavigationItem}>
    <a href={link} className={active ? classes.active : null}>
      {children}
    </a>
  </li>
);

export default NavigationItem;
