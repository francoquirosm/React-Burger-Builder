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
  return { type: actionTypes.AUTH_INITIATE_LOGOUT };
};

export const logoutSucceed = () => ({ type: actionTypes.AUTH_LOGOUT });

export const checkAuthTimeout = (expirationTime) => ({
  type: actionTypes.AUTH_LOGOUT_TIMEOUT,
  payload: { expirationTime },
});

export const auth = (email, password, isSignUp) => ({
  type: actionTypes.AUTH_USER,
  payload: { email, password, isSignUp },
});

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  payload: path,
});

export const authCheckState = () => ({
  type: actionTypes.AUTH_CHECK_STATE,
});
