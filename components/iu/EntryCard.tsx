import { FC, DragEvent, useContext } from 'react';
import {Card, CardActionArea, CardContent, Typography, CardActions} from '@mui/material';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({entry}) => {
    const {startDragging, endDragging} = useContext(UIContext);
    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', entry._id as string);
        startDragging();
    }

    const onDragEnd = (event: DragEvent) => {
        endDragging();
    }   

    return ( 
            <Card
                sx={{marginBottom: 1}}
                draggable={true}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            >
                <CardActionArea>
                    <CardContent>
                        <Typography sx={{whiteSpace: 'pre-line'}}>{entry.description}</Typography>
                    </CardContent>

                    <CardActions sx={{display: 'flex', justifyContent: 'end', padding: 1}}>
                        <Typography variant='body2'>Hace 30 minutos</Typography>
                    </CardActions>
                </CardActionArea>
            </Card>
     );
};
