import { createContext } from 'react';
import { Entry } from '../../interfaces/entry';

interface Context {
    entries: Entry[];
    addEntry: (description: String) => void;
    updateEntry: (entry: Entry) => void;
};

export const EntriesContext = createContext({} as Context);
