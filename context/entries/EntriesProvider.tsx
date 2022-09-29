import {FC, useReducer} from 'react';
import { Entry } from '../../interfaces';
import {EntriesContext, entriesReducer} from './';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider: FC<{children: React.ReactNode}> = ({children}) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

    const addEntry = (description: String) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            createdAt: Date.now(),
            description: description,
            status: 'pending',
        }

        dispatch({type: '[Entry] - Add-Entry', payload: newEntry});
    }

    return (
        <EntriesContext.Provider value={{...state, addEntry}}>
            {children}
        </EntriesContext.Provider>
    );
};