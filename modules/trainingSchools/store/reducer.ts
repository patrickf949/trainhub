import { useReducer } from "react";
import { ACTIONTYPE, EDITACTIONTYPE } from "./actions";
import { editInitialState, initialState } from "./initialState";

export function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "SchoolLoadingUpdate":
      return { ...state, isLoading: action.payload };
    case "SchoolUpdate":
      return { ...state, school: { ...state.school, ...action.payload } };
    case "stateUpdate":
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}

export function editReducer(
  state: typeof editInitialState,
  action: EDITACTIONTYPE
) {
  switch (action.type) {
    case "editSchoolLoadingUpdate":
      return { ...state, isLoading: action.payload };
    case "editSchoolUpdate":
      return { ...state, school: { ...state.school, ...action.payload } };
    case "editstateUpdate":
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}
