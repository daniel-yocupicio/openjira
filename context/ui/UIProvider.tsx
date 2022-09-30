import {FC, useReducer} from "react";
import {UIContext, uiReducer} from './';

export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
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

    const startDragging = () => {
        dispatch({type: 'UI - Start Dragging'});
    }

    const endDragging = () => {
        dispatch({type: 'UI - End Dragging'});
    }

    return (
        <UIContext.Provider 
            value={{
                ...state, 
                openSideMenu, 
                closeSideMenu, 
                openAddingForm, 
                closeAddingForm,
                startDragging,
                endDragging,
            }}
        >
            {children}
        </UIContext.Provider>
    );
}