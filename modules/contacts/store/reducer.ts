import { ACTIONTYPE, VIEWACTIONTYPE } from "./actions";
import { editInitialState, initialState } from "./initialState";

export function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "ContactLoadingChange":
      return { isLoading: action.payload };
    case "ContactUpdate":
      return { contact: { ...state.contact, ...action.payload } };
    case "stateUpdate":
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}

export function viewReducer(state: typeof editInitialState, action: VIEWACTIONTYPE) {
  switch (action.type) {
    case "ContactLoadingChange":
      return { isLoading: action.payload };
    case "ContactView":
      return { contact: { ...state.contact, ...action.payload } };
    case "stateUpdate":
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}
