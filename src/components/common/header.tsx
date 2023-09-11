

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { applicationPath } from '../../routes/routePath';

export function Header() {
    const navigate = useNavigate();

    return (
        <AppBar
            component='nav'
            position='static'
            sx={{
                display: 'flex',
                height: '120px',
                justifyContent: 'center',
                pl: 8,
                backgroundImage: 'linear-gradient(to right, #1a0552, #d4047d)',
            }}
        >
            <Toolbar>
                <Typography
                    variant='h4'
                    component='div'
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    <IconButton sx={{ p: 0 }} >
                        <img src='CrediLinq_Fav.jpg' alt='logo' style={{ width: 80 }} onClick={() => { navigate(applicationPath.HOME) }} />
                    </IconButton>
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Typography
                        variant='h4'
                        component='div'
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, mr: 8 }}
                    >
                        SME HealthCheck - Get Started
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
}