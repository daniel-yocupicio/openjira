import { createContext } from 'react';
import { Entry } from '../../interfaces/entry';

interface Context {
    entries: Entry[];
    addEntry: (description: string) => void;
    updateEntry: (entry: Entry, showSnackbar?: boolean) => void;
};

export const EntriesContext = createContext({} as Context);
