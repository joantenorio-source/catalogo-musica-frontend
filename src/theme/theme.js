import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#15121C',
      paper: '#1F1A2B',
    },
    primary: {
      main: '#E8B23D',
      contrastText: '#15121C',
    },
    secondary: {
      main: '#4F7A82',
    },
    text: {
      primary: '#F2EEE6',
      secondary: '#B8B0C4',
    },
    error: {
      main: '#D97757',
    },
    divider: 'rgba(242, 238, 230, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h4: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
    },
    caption: {
      fontFamily: '"JetBrains Mono", monospace',
      letterSpacing: '0.02em',
    },
    button: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1F1A2B',
          backgroundImage: 'none',
          borderBottom: '1px solid rgba(232, 178, 61, 0.25)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(242, 238, 230, 0.08)',
          transition: 'border-color 0.2s ease, transform 0.2s ease',
          '&:hover': {
            borderColor: 'rgba(232, 178, 61, 0.4)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;