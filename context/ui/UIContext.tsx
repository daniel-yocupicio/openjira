import { createContext } from "react";

interface Context {
    sidemenuOpen: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
}

export const UIContext = createContext({} as Context);



