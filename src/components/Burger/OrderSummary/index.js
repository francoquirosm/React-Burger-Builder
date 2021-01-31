import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button";

const OrderSummary = ({
  ingredients,
  purchaseCancelled,
  purchaseContinued,
  price,
}) => {
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
      <p>
        <strong>Total price: {price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
