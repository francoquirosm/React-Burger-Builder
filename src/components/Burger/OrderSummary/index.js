import React from "react";
import Aux from "../../../hoc/Aux";

const OrderSummary = ({ ingredients }) => {
  const ingredientSummary = Object.keys(ingredients).map((igKey) => (
    <li key={igKey}>
      <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
      {ingredients[igKey]}
    </li>
  ));
  return (
    <Aux>
      <h3>Your order</h3>
      <p>Delicious Burger with the following ingredients: </p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout?</p>
    </Aux>
  );
};

export default OrderSummary;
