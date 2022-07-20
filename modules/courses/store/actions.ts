import { allCoursesData, courseData} from "./types";

export type ACTIONTYPE =
  | { type: "CourseLoading"; payload: boolean }
  | {
      type: "stateUpdate";
      payload: { isLoading: boolean; course: courseData };
    }
  | { type: "Course"; payload: courseData }
  | { type: "CoursesUpdate"; payload: allCoursesData };
