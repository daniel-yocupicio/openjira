import { createContext } from "react";

interface Context {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
    closeAddingForm: () => void;
    openAddingForm: () => void;
    startDragging: () => void;
    endDragging: () => void;
}

export const UIContext = createContext({} as Context);



