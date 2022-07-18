import schoolData from "./types";

export type ACTIONTYPE =
  | { type: "SchoolLoadingUpdate"; payload: boolean }
  | {
      type: "stateUpdate";
      payload: { isLoading: boolean; school: schoolData };
    }
  | { type: "SchoolUpdate"; payload: schoolData }
  | { type: "SchoolsLoad"; payload: schoolData[] };
