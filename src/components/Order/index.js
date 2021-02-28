import React from "react";
import classes from "./styles.css";
const Order = ({ ingredients, price }) => {
  const parsedIngredients = [];
  for (let ingredientName in ingredients) {
    parsedIngredients.push({
      name: ingredientName,
      amount: ingredients[ingredientName],
    });
  }

  const ingredientOutput = parsedIngredients.map((ig) => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {ig.name}({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD{price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
