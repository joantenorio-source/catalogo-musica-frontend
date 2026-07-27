import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../services/authService';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navButtonStyle = (path) => ({
    color: location.pathname === path ? 'primary.main' : 'text.primary',
    fontWeight: location.pathname === path ? 700 : 500,
  });

  return (
    <AppBar position="static" elevation={0} sx={{ mb: 3 }}>
      <Toolbar>
        <Box
         component="img"
         src="/logo.png"
         alt="Logo"
         sx={{ height: 60, mr: 1.5 }}
      />
      <Typography
        variant="h5"
        sx={{
          flexGrow: 1,
          fontWeight: 700,
          letterSpacing: '0.03em',
          color: 'primary.main',
        }}
      >
        Sek Sound
      </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button onClick={() => navigate('/artists')} sx={navButtonStyle('/artists')}>
            Artistas
          </Button>
          <Button onClick={() => navigate('/albums')} sx={navButtonStyle('/albums')}>
            Álbumes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleLogout}
            sx={{ ml: 1, borderColor: 'secondary.main' }}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;