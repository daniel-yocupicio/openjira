import {useState, ChangeEvent, useContext} from 'react';
import {Button, Box, TextField} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
    const {closeAddingForm, openAddingForm, isAddingEntry} = useContext(UIContext);
    const [inputText, setInputText] = useState('');
    const [touched, setTouched] = useState(false);
    const {addEntry} = useContext(EntriesContext);
    const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    }

    const onSave = () => {
        if(inputText.length === 0) return;
        addEntry(inputText);
        closeAddingForm();
        setTouched(false);
        setInputText('');
    }

    return ( 
        <Box sx={{marginBottom: 2, paddingX: 2}}>
            {isAddingEntry ? 
            (
                <>
                    <TextField 
                        fullWidth 
                        sx={{marginTop: 1, marginBottom: 1}} 
                        autoFocus 
                        multiline 
                        label='Nueva tarea'
                        helperText={inputText.length <= 0 && touched && 'Ingrese una tarea'}
                        error={inputText.length <= 0 && touched}
                        placeholder='Ingrese la tarea'
                        value={inputText}
                        onChange={onTextFieldChanges}
                        onBlur={() => setTouched(true)}
                    />
                    <Box display='flex' justifyContent={'flex-end'} gap={1}>
                        <Button
                            variant='outlined'
                            color='error'
                            onClick={() => closeAddingForm()}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            variant='outlined'
                            color='secondary'
                            startIcon={<SaveIcon />}
                            onClick={onSave}
                        >
                            Guardar
                        </Button>
                    </Box>
                </>
            ) 
            : 
            (
                <Button
                    startIcon={<AddCircleOutlineIcon />}
                    fullWidth
                    variant='outlined'
                    onClick={() => openAddingForm()}
                >
                    Agregar tarea
                </Button>
            )}
        </Box>
     );
};



