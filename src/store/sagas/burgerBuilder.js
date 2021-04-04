import axios from "../../axios-orders";
import { put } from "redux-saga/effects";
import { setIngredients, fetchIngredientsFailed } from "../actions";

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get(
      "https://react-my-burger-9dcde-default-rtdb.firebaseio.com/ingredients.json"
    );
    yield put(setIngredients(response.data));
  } catch (error) {
    yield put(fetchIngredientsFailed());
  }
}
