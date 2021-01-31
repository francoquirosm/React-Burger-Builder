import React from "react";
import classes from "./styles.css";
import Backdrop from "../Backdrop";
import Aux from "../../../hoc/Aux";

const Modal = ({ show, children, closeModal }) => (
  <Aux>
    <Backdrop show={show} clicked={closeModal} />
    <div
      className={classes.Modal}
      style={{
        transform: show ? "translateY(0)" : "translateY(-100vh",
        opacity: show ? 1 : 0,
      }}
    >
      {children}
    </div>
  </Aux>
);

export default Modal;
