import { ACTIONTYPE, EDITACTIONTYPE } from "./actions";
import { editInitialState, initialState } from "./initialState";

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



export function editReducer(state: typeof editInitialState, action: EDITACTIONTYPE) {
  switch (action.type) {
    case "editCourseLoading":
      return { ...state, isLoading: action.payload };
    case "editCourse":
      return { ...state, course: { ...state.course, ...action.payload } };
    case "stateUpdate":
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}
