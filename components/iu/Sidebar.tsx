import { useContext } from 'react';
import {
    Drawer, 
    Box, 
    List, 
    Typography, 
    ListItem, 
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import { UIContext } from '../../context/ui/UIContext';

const getIcon = (number: number) => {
    if(number === 0) {
        return <InboxIcon />
    }

    if(number === 1) {
        return <MailIcon />
    }

    if(number === 2) {
        return <MoveToInboxIcon />
    }

    if(number === 3) {
        return <MailIcon />
    }

    return null;
}

const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts']

export const Sidebar = () => {
    const {sidemenuOpen, closeSideMenu} = useContext(UIContext);

    return ( 
        <Drawer 
            anchor='left'
            open={sidemenuOpen}
            onClose={closeSideMenu}
        >
            <Box sx={{width: 250}}>

                <Box sx={{padding: '5px 10px'}}>
                    <Typography>Menú</Typography>
                </Box>

                <List>
                    {menuItems.map((item, index) => (
                        <ListItem button key={index}>
                                <ListItemIcon>
                                    {getIcon(index)}
                                </ListItemIcon>
                                <ListItemText>{item}</ListItemText>
                        </ListItem>
                    ))}
                </List>

                <Divider />

                <List>
                    {menuItems.map((item, index) => (
                        <ListItem button key={index}>
                                <ListItemIcon>
                                    {getIcon(index)}
                                </ListItemIcon>
                                <ListItemText>{item}</ListItemText>
                        </ListItem>
                    ))}
                </List>

            </Box>

        </Drawer>
     );
}
 