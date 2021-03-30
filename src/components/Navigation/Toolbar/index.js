import React from "react";
import Logo from "../../UI/Logo";
import NavigationItems from "../NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle";
import classes from "./styles.css";

const Toolbar = ({ drawerToggleClicked, isAuthenticated }) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={drawerToggleClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={isAuthenticated} />
    </nav>
  </header>
);

export default Toolbar;
