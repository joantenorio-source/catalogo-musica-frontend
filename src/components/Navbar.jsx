import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import AlbumIcon from '@mui/icons-material/Album';
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
        <AlbumIcon sx={{ color: 'primary.main', mr: 1.5 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Catálogo de Música
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