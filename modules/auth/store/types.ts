import { ReactNode } from "react";

export type authContextType = {
    user: boolean;
    login: () => void;
};
export type Props = {
    children: ReactNode;
};