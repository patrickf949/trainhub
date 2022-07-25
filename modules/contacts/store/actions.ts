import { contactObj, editContactObj } from "./types";

export type ACTIONTYPE =
  | { type: "ContactLoadingChange"; payload: boolean }
  | {
      type: "stateUpdate";
      payload: { isLoading: boolean; contact: editContactObj };
    }
  | { type: "ContactUpdate"; payload: editContactObj };


export type VIEWACTIONTYPE =
  | { type: "ContactLoadingChange"; payload: boolean }
  | {
      type: "stateUpdate";
      payload: { isLoading: boolean; contact: contactObj };
    }
    | { type: "ContactView"; payload: contactObj }
