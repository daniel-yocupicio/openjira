import {FC, useReducer, useEffect} from 'react';
import { Entry } from '../../interfaces';
import {EntriesContext, entriesReducer} from './';
import { entriesAPI } from '../../apis';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

    const addEntry = async (description: string) => {
        try {
            const {data} = await entriesAPI.post<Entry>('/entries', {description})
            dispatch({type: '[Entry] - Add-Entry', payload: data});
        } catch(e) {
            alert('Error al agregar la tarea.');
        }
    }

    const updateEntry = (entry: Entry) => {
        dispatch({type: '[Entry] - Entry-Updated', payload: entry});
    }

    const refreshEntries = async() => {
        const {data} = await entriesAPI.get<Entry[]>('/entries');
        dispatch({type: '[Entry] - Get-Entries', payload: data})
    }

    useEffect(() => {
        refreshEntries();
    },[])

    return (
        <EntriesContext.Provider value={{...state, addEntry, updateEntry}}>
            {children}
        </EntriesContext.Provider>
    );
};