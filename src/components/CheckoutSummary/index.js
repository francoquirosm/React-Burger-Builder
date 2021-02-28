import React from "react";

import Burger from "../Burger";
import Button from "../UI/Button";

import classes from "./styles.css";

const CheckoutSummary = ({
  ingredients,
  checkoutCancelled,
  checkoutContinued,
}) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope it tastes well!</h1>
      <div style={{ margin: "auto" }}>
        <Burger ingredients={ingredients} />
        <Button btnType="Danger" clicked={checkoutCancelled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={checkoutContinued}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
