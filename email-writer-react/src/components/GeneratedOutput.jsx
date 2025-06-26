// src/components/GeneratedOutput.jsx
import React from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function GeneratedOutput({ generatedReply, handleCopyClick, isMinimized, toggleMinimize }) {
    // Determine the number of rows based on minimize state
    const textFieldRows = isMinimized ? 5 : 30;

    return (
        <Box sx={{ mt: 4, p: 3, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: 'rgb(255, 255, 255)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'rgb(55, 77, 150)', mb: 0 }}>
                    Generated Reply
                </Typography>
                <IconButton onClick={toggleMinimize} size="small" color="primary">
                    {isMinimized ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
            </Box>
            <TextField
                fullWidth
                multiline
                rows={textFieldRows}
                variant="outlined"
                value={generatedReply}
                InputProps={{
                    readOnly: true,
                    style: { backgroundColor: 'rgb(254, 255, 247)', color: '#rgb(55, 77, 150' } // Light green background with dark text
                }}
                sx={{ mb: 2, transition: 'all 0.3s ease-in-out' }}
            />
            <Button
                variant="outlined"
                color="primary"
                sx={{ width: '100%' }}
                onClick={handleCopyClick}
            >
                Copy to Clipboard
            </Button>
        </Box>
    );
}

export default GeneratedOutput;
