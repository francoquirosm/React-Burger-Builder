import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: authData,
  };
};
export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, +expirationTime * 1000);
  };
};

const persistSession = (token, expirationTime, userId) => {
  const expirationDate = new Date(new Date().getTime() + expirationTime * 1000);
  localStorage.setItem("token", token);
  localStorage.setItem("expirationDate", expirationDate);
  localStorage.setItem("userId", userId);
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = { email, password, returnSecureToken: true };
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:${
      isSignUp ? "signUp" : "signInWithPassword"
    }?key=AIzaSyA_so0ZngELMprkup1DdrT5F3X-eA9Q85o`;
    axios
      .post(url, authData)
      .then((response) => {
        persistSession(
          response.data.idToken,
          response.data.expiresIn,
          response.data.localId
        );
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFailed(err.response.data.error.message));
      });
  };
};

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  payload: path,
});

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess({ idToken: token, localId: userId }));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
