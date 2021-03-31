import reducer from "./auth";
import { initialState } from "./auth";
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should store the token upon login", () => {
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        payload: { idToken: "idToken", localId: "userId" },
      })
    ).toEqual(
      updateObject(initialState, { token: "idToken", userId: "userId" })
    );
  });
});
