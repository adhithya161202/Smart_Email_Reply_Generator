import React, { useState } from 'react'; // Corrected import syntax
// Material-UI imports
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  CircularProgress,
  Snackbar, // For copy to clipboard feedback
  Alert     // For Snackbar content
} from '@mui/material';

// Individual Material-UI component imports (these are still valid but can be removed from here if not used directly in App.jsx's return)
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';

import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline

// Import custom theme
import theme from './theme.js'; // Explicit .js extension

// Import refactored components
import EmailForm from './components/EmailForm.jsx'; // Explicit .jsx extension
import GeneratedOutput from './components/GeneratedOutput.jsx'; // Explicit .jsx extension
import SnackbarMessage from './components/SnackbarMessage.jsx'; // Explicit .jsx extension

import './App.css'; // Global styling, explicit .css extension


function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isReplyMinimized, setIsReplyMinimized] = useState(false);


  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setGeneratedReply('');
    setSnackbarOpen(false);
    setIsReplyMinimized(false);

    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });

      const replyText = typeof response.data === 'string' ? response.data : response.data.reply;
      setGeneratedReply(replyText);

      setSnackbarMessage('Email reply generated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Optionally clear inputs after successful generation
      setEmailContent('');
      setTone('');

    } catch (err) {
      console.error("Error generating reply:", err);
      let errorMessage = 'Failed to generate reply. Please try again.';

      if (axios.isAxiosError(err) && err.response) { // Use axios.isAxiosError to check error type
        // The request was made and the server responded with a status code
        errorMessage = err.response.data && err.response.data.message
          ? err.response.data.message
          : `Server Error: ${err.response.status}`;
      } else if (axios.isAxiosError(err) && err.request) {
        // The request was made but no response was received
        errorMessage = 'Network Error: Could not reach the server. Is your Spring Boot app running?';
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = 'Request Error: ' + err.message;
      }
      setError(errorMessage);
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);

    } finally {
      setLoading(false);
    }
  };

  const handleCopyClick = () => {
    if (navigator.clipboard && generatedReply) {
      navigator.clipboard.writeText(generatedReply)
        .then(() => {
          setSnackbarMessage('Reply copied to clipboard!');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          setSnackbarMessage('Failed to copy reply.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        });
    } else {
      setSnackbarMessage('Clipboard API not supported or content is empty.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const toggleMinimizeReply = () => {
    setIsReplyMinimized(prev => !prev);
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        disableGutters // Remove left/right padding
        sx={{
          width: '100vw',        // Take full viewport width
          Height: '100vh',    // Take full viewport heigh               // Apply padding for content inside
          bgcolor: 'rgb(224, 226, 255)', // Use theme's default background color for the whole page
          display: 'flex',       // Use flexbox for internal content alignment
          flexDirection: 'column', // Stack children vertically
          alignItems: 'center',  // Center content horizontally within the container
          justifyContent: 'center', // Center content vertically if it doesn't fill the space
          overflowY: 'auto',
          padding: 4,  
          marginBlockStart:5         // Add padding around the content

        }}
      >
        {/* Inner Box to act as a responsive card for the content */}
        <Box sx={{
          width: '100%',  // Allow box to take full width up to maxWidth
          borderRadius: 2,  // Rounded corners for the card

        }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 ,color: 'rgb(40, 52, 122)'}}>
            Email Reply Generator
          </Typography>

          <EmailForm
            emailContent={emailContent}
            setEmailContent={setEmailContent}
            tone={tone}
            setTone={setTone}
            handleSubmit={handleSubmit}
            loading={loading}
          />

          {generatedReply && (
            <GeneratedOutput
              generatedReply={generatedReply}
              handleCopyClick={handleCopyClick}
              isMinimized={isReplyMinimized} // Pass minimize state
              toggleMinimize={toggleMinimizeReply} // Pass toggle function
            />
          )}
        </Box>
      </Container>

      <SnackbarMessage
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />
    </ThemeProvider>
  );
}

export default App;
