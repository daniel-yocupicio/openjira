import Head from 'next/head';
import {Box} from '@mui/material';
import { FC } from 'react';
import { Navbar, Sidebar } from '../iu';

interface Props {
    title?: String;
    children: React.ReactNode;
}

export const Layout: FC<Props> = ({title = 'Openjira', children}) => {
    return ( 
        <Box sx={{flexFlow: 1}}>
            <Head>
                <title>{title}</title>
            </Head>

            <Navbar />
            <Sidebar />

            <Box sx={{padding: '10px 20px'}}>
                {children}
            </Box>
        </Box>
     );
}
 
export default Layout;