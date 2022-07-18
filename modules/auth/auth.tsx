import { createContext, ReactNode, useContext, useState } from "react";
import { storeUserDetails } from "./store/changes";
import { checkLoggedIn } from "./store/changes";
import { TOKEN } from "./store/constants";
import { authContextDefaultValues } from "./store/initialState";
import { authContextType,Props } from "./store/types";
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()


const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}


export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<boolean>(checkLoggedIn());

    const login = () => {

        const token = "JWT "+TOKEN;
        storeUserDetails(token);
        setUser(true);
    };


    const value = {
        user,
        login,
    };
    return (
        <>
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
            </QueryClientProvider>
        </>
    );
}
