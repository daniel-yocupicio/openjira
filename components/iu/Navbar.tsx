import { FC, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { UIContext } from '../../context/ui';
import NextLink from 'next/link';

export const Navbar: FC = () => {
    const {openSideMenu} = useContext(UIContext);

    return ( 
        <AppBar position='sticky'>
            <Toolbar>
                <IconButton 
                    size='large'
                    edge='start'
                    onClick={openSideMenu}
                >
                    <MenuIcon />
                </IconButton>
                <NextLink href="/" passHref>
                    <Link underline="none" color="white">
                        <Typography variant='h6'>Openjira</Typography>
                    </Link>
                </NextLink>
            </Toolbar>
        </AppBar>
     );
}
 