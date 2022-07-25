import { editContactObj } from "./types";

export type ACTIONTYPE =
  | { type: "ContactLoadingChange"; payload: boolean }
  | {
      type: "stateUpdate";
      payload: { isLoading: boolean; contact: editContactObj };
    }
  | { type: "ContactUpdate"; payload: editContactObj };
