import React from "react";
import NavigationItem from "./NavigationItem";
import classes from "./styles.css";

const NavigationItems = ({ isAuthenticated }) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>
      Burger Builder
    </NavigationItem>
    {isAuthenticated && <NavigationItem link="/orders">Orders</NavigationItem>}
    {isAuthenticated ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
