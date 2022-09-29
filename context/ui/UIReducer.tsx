import { UIState } from './';

type UIActionType = 
| { type: 'UI - Open Sidebar' }
| { type: 'UI - Close Sidebar' }
| { type: 'UI - Open Adding Form' }
| { type: 'UI - Close Adding Form' }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
    switch(action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sidemenuOpen: true,
            }

        case 'UI - Close Sidebar':
            return {
                ...state,
                sidemenuOpen: false,
            }

        case 'UI - Open Adding Form':
            return {
                ...state,
                isAddingEntry: true,
            }

        case 'UI - Close Adding Form':
            return {
                ...state,
                isAddingEntry: false,
            }
    
        default:
            return state;
    }
};
 