import { useReducer } from "react"
import { ACTIONTYPE } from "./actions";
import { initialState } from "./initialState";


export function reducer(state: typeof initialState, action: ACTIONTYPE) {
    switch (action.type) {
      case "SchoolLoadingUpdate":
        return { ...state, isLoading: action.payload };
      case "SchoolUpdate":
        return { ...state, school: action.payload };
    case "stateUpdate":
        return { ...state,...action.payload };
      default:
        throw new Error();
    }
  }