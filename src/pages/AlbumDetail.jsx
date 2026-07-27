import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Chip,
  IconButton,
  CircularProgress,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getAlbum } from '../services/albumsService';
import EmptyCoverArt from '../components/EmptyCoverArt';

function AlbumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getAlbum(id);
        setAlbum(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !album) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">No se pudo cargar el álbum.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <IconButton onClick={() => navigate('/albums')} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={5}>
          <Box
            sx={{
              width: '100%',
              aspectRatio: '1 / 1',
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid rgba(242,238,230,0.08)',
            }}
          >
            {album.cover ? (
              <Box
                component="img"
                src={album.cover}
                alt={album.title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <EmptyCoverArt sx={{ height: '100%' }} />
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sm={7}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid rgba(242,238,230,0.08)', height: '100%' }}>
            <Typography variant="h4" gutterBottom>
              {album.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary.main"
              sx={{ mb: 2, cursor: 'pointer' }}
              onClick={() => navigate(`/artists/${album.artist}`)}
            >
              {album.artist_name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip label={album.release_date} size="small" />
              <Chip label={album.genre} size="small" variant="outlined" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AlbumDetail;