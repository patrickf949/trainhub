import { createContext, ReactNode, useContext } from "react";
import { authContextDefaultValues } from "./store/initialState";
import { authContextType } from "./store/types";

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

