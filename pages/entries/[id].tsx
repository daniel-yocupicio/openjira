import { useState, ChangeEvent, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next'
import { Layout } from "../../components/layouts";
import {
    Grid, 
    Card, 
    CardHeader, 
    CardContent, 
    TextField, 
    CardActions, 
    Button, 
    FormControl, 
    FormLabel, 
    RadioGroup,
    FormControlLabel,
    Radio,
    capitalize,
    IconButton
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { Entry, EntryStatus } from "../../interfaces";
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry;
}

const EntryPage: FC<Props> = ({entry}) => {
    const {updateEntry} = useContext(EntriesContext);
    const [inputText, setInputText] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputText.length <= 0 && touched, [inputText.length, touched]);

    const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        try {
            setStatus(event.target.value as EntryStatus);
        } catch (e) {
            alert('El estado de la tarea no es correcto.');
        }
    }

    const onSave = () => {
        if(inputText.trim().length === 0) return;

        const updatedEntry: Entry = {
            ...entry,
            status: status,
            description: inputText,
        }

        updateEntry(updatedEntry, true);
    }

    return ( 
        <Layout title={`Tarea: ${entry.status}`}>

            <Grid
                container
                justifyContent='center'
                sx={{marginTop: 2}} 
            >
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={6}
                >
                    <Card>
                        <CardHeader
                            title={'Tarea: ' + inputText}
                            subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
                        />
                        <CardContent>
                            <TextField 
                                sx={{marginTop: 2, marginBottom: 1}}
                                fullWidth
                                placeholder="Nueva tarea"
                                autoFocus
                                multiline
                                label="Nueva tarea"
                                value={inputText}
                                onChange={onTextFieldChanged}
                                helperText={isNotValid && 'Ingrese un valor'}
                                onBlur={()=> setTouched(true)}
                                error={isNotValid && touched}
                            />

                            <FormControl>
                                <FormLabel>Estado: </FormLabel>
                                <RadioGroup row value={status} onChange={onStatusChanged}>
                                    {validStatus.map(item => (
                                        <FormControlLabel 
                                            key={item}
                                            value={item}
                                            control={<Radio />}
                                            label={capitalize(item)}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>

                        </CardContent>
                        <CardActions>
                            <Button 
                                startIcon={<SaveIcon />}
                                fullWidth
                                variant='contained'    
                                onClick={onSave}
                                disabled={inputText.length <= 0 }
                            >
                                Guardar
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'red'
                }}
            >
                <DeleteIcon />
            </IconButton>
        </Layout>
     );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const {id} = params as {id: string};
    const entry = await dbEntries.getEntryById(id);

    if(!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage;
