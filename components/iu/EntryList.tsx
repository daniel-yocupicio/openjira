import {FC, Key, useContext, useMemo} from 'react';
import {Box, Paper, List} from '@mui/material';
import { EntryCard } from './';
import { EntryStatus } from '../../interfaces/entry';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';

interface Props {
    status: EntryStatus;
}

const isPending = (status: String, value: boolean) => {   
    if(status === 'pending' && value === false) return '253px';
    if(status === 'pending' && value === true) return '326px';
    return '200px';
}

export const EntryList: FC<Props> = ({status}) => {
    const {entries} = useContext(EntriesContext);
    const {isAddingEntry} = useContext(UIContext);
    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status) ,[entries, status]);

    return ( 
        <div>
            <Paper 
                sx={{
                    height: `calc(100vh - ${isPending(status, isAddingEntry)})`, 
                    overflowY: 'scroll', 
                    backgroundColor: 'transparent',
                    padding: '1px 5px',
                }}
            >
                    <List  sx={{opacity: 1}}>
                        {
                            entriesByStatus.map(entry => (
                                <EntryCard key={entry._id as Key} entry={entry}/>
                            ))
                        }
                    
                    </List>
                </Paper>
            </div>
     );
}
