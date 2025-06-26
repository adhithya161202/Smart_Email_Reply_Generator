// src/theme.js
import { createTheme } from '@mui/material/styles';
import { blue, grey, green, red, orange } from '@mui/material/colors';

// Create a Material-UI theme with Google-inspired colors and typography
const theme = createTheme({
    palette: {
        primary: {
            main: blue[700], // A strong Google Blue
            light: blue[400],
            dark: blue[900],
        },
        secondary: {
            main: grey[800], // Dark grey for secondary elements
            light: grey[600],
            dark: grey[900],
        },
        success: {
            main: green[600], // Standard success green
        },
        error: {
            main: red[600], // Standard error red
        },
        warning: {
            main: orange[600], // Standard warning orange
        },
        background: {
            default: '#f0f2f5', // Light background for the overall page
            paper: '#FFFFFF',   // White background for cards/containers
        },
    },
    typography: {
        fontFamily: 'Inter, sans-serif', // Use Inter font
        h3: {
            fontWeight: 700,
            fontSize: '2.5rem',
            '@media (max-width:600px)': {
                fontSize: '1.8rem',
            },
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.5rem',
            '@media (max-width:600px)': {
                fontSize: '1.2rem',
            },
        },
        body1: {
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none', // Buttons will not be all caps by default
            fontWeight: 600,
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Rounded corners for buttons
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                        transform: 'translateY(-2px)',
                    },
                },
                containedPrimary: {
                    backgroundColor: blue[700],
                    '&:hover': {
                        backgroundColor: blue[800],
                    },
                },
                outlinedPrimary: {
                    borderColor: blue[700],
                    color: blue[700],
                    '&:hover': {
                        borderColor: blue[800],
                        color: blue[800],
                        backgroundColor: blue[50], // Light blue hover background
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    borderRadius: 12, // More rounded corners for the main container
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // More prominent shadow
                },
            },
        },
    },
});

export default theme;
