import {FC, useReducer} from "react";
import {UIContext, uiReducer} from './';

export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
}

export const UIProvider: FC<{children: React.ReactNode}> = ({children}) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({type: 'UI - Open Sidebar'});
    }

    const closeSideMenu = () => {
        dispatch({type: 'UI - Close Sidebar'});
    }

    const openAddingForm = () => {
        dispatch({type: 'UI - Open Adding Form'});
    }

    const closeAddingForm = () => {
        dispatch({type: 'UI - Close Adding Form'});
    }

    return (
        <UIContext.Provider value={{...state, openSideMenu, closeSideMenu, openAddingForm, closeAddingForm}}>
            {children}
        </UIContext.Provider>
    );
}