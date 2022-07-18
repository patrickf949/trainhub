export type ACTIONTYPE =
  | { type: "ContactLoadingChange"; payload: boolean }
  | {
      type: "stateUpdate";
      payload: { isLoading: boolean; contact: { phoneNumber: string } };
    }
  | { type: "ContactUpdate"; payload: { phoneNumber: string } };
