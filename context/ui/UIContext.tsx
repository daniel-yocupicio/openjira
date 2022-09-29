import { createContext } from "react";

interface Context {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
    closeAddingForm: () => void;
    openAddingForm: () => void;
}

export const UIContext = createContext({} as Context);



