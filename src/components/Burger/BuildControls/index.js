import React from "react";
import BuildControl from "./BuildControl";
import classes from "./styles.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];
const BuildControls = ({
  ingredientAdded,
  ingredientRemoved,
  disabled,
  price,
  purchasable,
}) => (
  <div className={classes.BuildControls}>
    <p>
      Current price: <strong>{price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => ingredientAdded(ctrl.type)}
        removed={() => ingredientRemoved(ctrl.type)}
        disabled={disabled[ctrl.type]}
      ></BuildControl>
    ))}
    <button className={classes.OrderButton} disabled={!purchasable}>
      ORDER NOW!
    </button>
  </div>
);

export default BuildControls;
