import { put, delay, call } from "redux-saga/effects";
import {
  logoutSucceed,
  logout,
  authStart,
  authSuccess,
  authFailed,
  checkAuthTimeout,
} from "../actions";
import axios from "axios";

export function* logoutSaga(action) {
  // By using call it's easier to mock/test
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield call([localStorage, "removeItem"], "userId");
  yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.payload.expirationTime * 1000);
  yield put(logout());
}

export function* authUserSaga(action) {
  yield put(authStart());
  const { email, password, isSignUp } = action.payload;
  const authData = { email, password, returnSecureToken: true };
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:${
    isSignUp ? "signUp" : "signInWithPassword"
  }?key=AIzaSyA_so0ZngELMprkup1DdrT5F3X-eA9Q85o`;
  try {
    const response = yield axios.post(url, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(authSuccess(response.data));
    yield put(checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(authFailed(error.response.data.error.message));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate > new Date()) {
      const userId = yield localStorage.getItem("userId");
      yield put(authSuccess({ idToken: token, localId: userId }));
      yield put(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(logout());
    }
  }
}
