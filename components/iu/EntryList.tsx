import {FC, Key, useContext, useMemo, DragEvent} from 'react';
import {Box, Paper, List} from '@mui/material';
import { EntryCard } from './';
import { EntryStatus } from '../../interfaces/entry';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';
import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

const isPending = (status: String, value: boolean) => {   
    if(status === 'pending' && value === false) return '253px';
    if(status === 'pending' && value === true) return '326px';
    return '200px';
}

export const EntryList: FC<Props> = ({status}) => {
    const {entries, updateEntry} = useContext(EntriesContext);
    const {isAddingEntry, isDragging, endDragging} = useContext(UIContext);
    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status) ,[entries, status]);

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text');
        const entry = entries.find(e => e._id === id)!;
        entry.status = status;
        updateEntry(entry);
        endDragging();
    };

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    return ( 
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
            <Paper 
                sx={{
                    height: `calc(100vh - ${isPending(status, isAddingEntry)})`, 
                    overflowY: 'auto', 
                    backgroundColor: 'transparent',
                    padding: '3px 5px',
                    scrollbarWidth: 'none',
                    scrollbarColor: 'unset'
                }}
            >
                    <List  sx={{opacity: isDragging ? 0.2 : 1, transition: 'all .3s'}}>
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
