import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getArtist } from '../services/artistsService';
import EmptyCoverArt from '../components/EmptyCoverArt';

function ArtistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getArtist(id);
        setArtist(data);
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

  if (error || !artist) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">No se pudo cargar el artista.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <IconButton onClick={() => navigate('/artists')} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          {artist.picture ? (
            <Box
              component="img"
              src={artist.picture}
              alt={artist.name}
              sx={{ width: '100%', borderRadius: 2, border: '1px solid rgba(242,238,230,0.08)' }}
            />
          ) : (
            <Box sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <EmptyCoverArt />
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {artist.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip label={artist.country} size="small" />
            <Chip label={artist.birth_date} size="small" variant="outlined" />
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {artist.biography || 'Sin biografía disponible.'}
          </Typography>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Álbumes ({artist.albums ? artist.albums.length : 0})
          </Typography>

          {artist.albums && artist.albums.length > 0 ? (
            <Grid container spacing={2}>
              {artist.albums.map((album) => (
                <Grid item xs={12} sm={6} key={album.id}>
                  <Card
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/albums/${album.id}`)}
                  >
                    <CardContent>
                      <Typography variant="subtitle1">{album.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {album.release_date} · {album.genre}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography color="text.secondary">Este artista aún no tiene álbumes.</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ArtistDetail;