import { allCoursesData, courseData, editCourseData} from "./types";

export type ACTIONTYPE =
  | { type: "CourseLoading"; payload: boolean }
  | {
      type: "stateUpdate";
      payload: { isLoading: boolean; course: courseData };
    }
  | { type: "Course"; payload: courseData }
  | { type: "CoursesUpdate"; payload: allCoursesData };

  export type EDITACTIONTYPE =
  | { type: "editCourseLoading"; payload: boolean }
  | {
      type: "stateUpdate";
      payload: { isLoading: boolean; course: editCourseData };
    }
  | { type: "editCourse"; payload: editCourseData }
