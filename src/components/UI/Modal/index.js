import React from "react";
import classes from "./styles.css";
import Backdrop from "../Backdrop";
import Aux from "../../../hoc/Aux/";

const Modal = (props) => {
  // Replaced shouldComponentUpdate with React.memo
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.show !== this.props.show ||
  //     nextProps.children !== this.props.children
  //   );
  // }
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.closeModal} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh",
          opacity: props.show ? 1 : 0,
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
