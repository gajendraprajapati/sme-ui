import { Box } from '@mui/material';

export const Footer = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'linear-gradient(to right, #1a0552, #d4047d)',
                height: 30,
                position: 'fixed',
                bottom: 0,
                width: '100%',
            }}
        ></Box>
    );
}

export default Footer;
