import { createContext } from 'react';
import { Entry } from '../../interfaces/entry';

interface Context {
    entries: Entry[];
    addEntry: (description: String) => void;
};

export const EntriesContext = createContext({} as Context);
