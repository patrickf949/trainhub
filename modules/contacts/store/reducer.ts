import { ACTIONTYPE } from "./actions";
import { initialState } from "./initialState";


export function reducer(state: typeof initialState, action: ACTIONTYPE) {
    switch (action.type) {
      case "ContactLoadingChange":
        return { isLoading: action.payload };
      case "ContactUpdate":
        return { contact: {...state.contact,...action.payload }};
    case "stateUpdate":
        return { ...state,...action.payload };
      default:
        throw new Error();
    }
  }