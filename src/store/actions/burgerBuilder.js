import * as actionTypes from "../actions/actionTypes";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    payload: name,
  };
};
export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    payload: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: ingredients,
  };
};
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => ({ type: actionTypes.INIT_INGREDIENTS });
