// src/components/SnackbarMessage.jsx
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

function SnackbarMessage({ open, message, severity, handleClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarMessage;
