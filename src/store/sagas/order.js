import axios from "./../../axios-orders";
import { put } from "redux-saga/effects";
import {
  purchaseBurgerStart,
  purchaseBurgerFailed,
  purchaseBurgerSuccess,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailed,
} from "../actions";

export function* purchaseBurgerSaga(action) {
  yield put(purchaseBurgerStart());
  try {
    const response = yield axios.post(
      `/orders.json?auth=${action.payload.token}`,
      action.payload.orderData
    );
    yield put(
      purchaseBurgerSuccess(response.data.name, action.payload.orderData)
    );
  } catch (error) {
    yield put(purchaseBurgerFailed(error));
  }
}

export function* fetchedOrdersSaga(action) {
  yield put(fetchOrdersStart());
  const queryParams = `?auth=${action.payload.token}&orderBy="userId"&equalTo="${action.payload.userId}"`;
  try {
    const response = yield axios.get(`/orders.json${queryParams}`);
    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({ ...response.data[key], id: key });
    }
    yield put(fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(fetchOrdersFailed(error));
  }
}
