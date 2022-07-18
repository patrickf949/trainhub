import { ReactNode } from "react";

export type authContextType = {
    user: boolean;
    login: () => void;
    logout:()=>void
};
export type Props = {
    children: ReactNode;
};