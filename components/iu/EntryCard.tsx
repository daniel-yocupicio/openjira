import { FC } from 'react';
import {Card, CardActionArea, CardContent, Typography, CardActions} from '@mui/material';
import { Entry } from '../../interfaces';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({entry}) => {
    return ( 
        <div>
            <Card
                sx={{marginBottom: 1}}
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
        </div>
     );
};
