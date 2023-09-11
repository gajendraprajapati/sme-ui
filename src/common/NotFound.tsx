import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { applicationPath } from '../routes/routePath';
import { blue } from '@mui/material/colors';

export const NotFound = () => {
    const navigate = useNavigate();
    const goHome = () => {
        return navigate(applicationPath.HOME);
    }
    return (
        <>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h1' color={blue}>404</Typography>
                <Typography variant='h2'>Page Not Found</Typography>
                <Button variant='contained' sx={{ mt: '1rem' }} onClick={goHome}>GO HOME</Button>
            </Box>
        </>
    )
}
