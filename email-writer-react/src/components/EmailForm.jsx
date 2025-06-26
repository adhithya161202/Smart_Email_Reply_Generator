// src/components/EmailForm.jsx
import React from 'react';
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    CircularProgress
} from '@mui/material';

function EmailForm({
    emailContent,
    setEmailContent,
    tone,
    setTone,
    handleSubmit,
    loading,
}) {
    return (
        <Box sx={{ mb: 3, p: 3, border: '1px solidrgb(0, 0, 0)', borderRadius: 2, backgroundColor: 'rgb(255, 255, 255)', width: '100%' }}>
            <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                label="Original Email Content"
                placeholder="Paste the email content you want to reply to here..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                sx={{ mb: 3, transition: 'all 0.3s ease-in-out' }}
            />

            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                <InputLabel id="tone-select-label">Desired Tone</InputLabel>
                <Select
                    labelId="tone-select-label"
                    id="tone-select"
                    value={tone}
                    label="Desired Tone"
                    onChange={(e) => setTone(e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="formal">Formal</MenuItem>
                    <MenuItem value="casual">Casual</MenuItem>
                    <MenuItem value="friendly">Friendly</MenuItem>
                    <MenuItem value="professional">Professional</MenuItem>
                    <MenuItem value="concise">Concise</MenuItem>
                </Select>
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading || !emailContent || !tone}
                sx={{ width: '50%',alignContent: 'center', display: 'block', margin: '0 auto' }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Reply'}
            </Button>
        </Box>
    );
}

export default EmailForm;
