import { ACTIONTYPE } from "./actions";
import { initialState } from "./initialState";

export function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "CourseLoading":
      return { ...state, isLoading: action.payload };
    case "Course":
      return { ...state, course: { ...state.course, ...action.payload } };
    case "stateUpdate":
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}
