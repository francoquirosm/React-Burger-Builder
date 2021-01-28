import React from "react";
import BuildControl from "./BuildControl";
import classes from "./styles.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];
const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        type={ctrl.type}
      ></BuildControl>
    ))}
  </div>
);

export default BuildControls;
