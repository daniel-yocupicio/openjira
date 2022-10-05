import {FC, useReducer, useEffect} from 'react';
import { Entry } from '../../interfaces';
import {EntriesContext, entriesReducer} from './';
import { entriesAPI } from '../../apis';
import { useSnackbar } from 'notistack';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();

    const addEntry = async (description: string) => {
        try {
            const {data} = await entriesAPI.post<Entry>('/entries', {description})
            dispatch({type: '[Entry] - Add-Entry', payload: data});
        } catch(e) {
            alert('Error al agregar la tarea.');
        }
    }

    const updateEntry = async (entry: Entry, showSnackbar = false) => {
        try {
            const {data} = await entriesAPI.put<Entry>(`/entries/${entry._id}`, {description: entry.description, status: entry.status});
            dispatch({type: '[Entry] - Entry-Updated', payload: data});
            
            if (showSnackbar) {
                enqueueSnackbar('Tarea actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                });
            }
            
        } catch(e) {
            alert(e);
        }
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