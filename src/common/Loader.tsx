import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export const Loader = () => {
    return <Box
        sx={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            left: "0",
            top: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "999",
            background: `rgba(255,255,255,.5)`,
        }}
    >
        <CircularProgress />
    </Box>
}
