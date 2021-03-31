import React from "react";
import Aux from "../../../hoc/Aux";
import Backdrop from "../../UI/Backdrop";
import Logo from "../../UI/Logo";
import NavigationItems from "../NavigationItems";
import classes from "./styles.css";

const SideDrawer = ({ closed, isOpen }) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (isOpen) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={isOpen} clicked={closed} />
      <div className={attachedClasses.join(" ")} onClick={closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
