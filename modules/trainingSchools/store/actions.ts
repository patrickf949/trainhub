import {schoolData, schoolEditObj} from "./types";

export type ACTIONTYPE =
  | { type: "SchoolLoadingUpdate"; payload: boolean }
  | {
      type: "stateUpdate";
      payload: { isLoading: boolean; school: schoolData };
    }
  | { type: "SchoolUpdate"; payload: schoolData }
  | { type: "SchoolsLoad"; payload: schoolData[] };


export type EDITACTIONTYPE =
  | { type: "editSchoolLoadingUpdate"; payload: boolean }
  | {
      type: "editstateUpdate";
      payload: { isLoading: boolean; school: schoolEditObj };
    }
  | { type: "editSchoolUpdate"; payload: schoolEditObj };
