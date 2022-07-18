import { checkLoggedIn } from "./changes";
import { authContextType } from "./types";


export const authContextDefaultValues: authContextType = {
    user:checkLoggedIn(),
    login: () => {},
    logout:()=>{},
};

