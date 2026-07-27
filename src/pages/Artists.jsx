import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  IconButton,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  TextField,
  InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import AlbumIcon from '@mui/icons-material/Album';

import {
  getArtists,
  createArtist,
  updateArtist,
  deleteArtist,
} from '../services/artistsService';
import ArtistFormDialog from '../components/ArtistFormDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyCoverArt from '../components/EmptyCoverArt';

function Artists() {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [artistToDelete, setArtistToDelete] = useState(null);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const loadArtists = async (search = '') => {
    setLoading(true);
    try {
      const data = await getArtists(search);
      setArtists(data);
    } catch (err) {
      setSnackbar({ open: true, message: 'Error al cargar artistas', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtists();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadArtists(searchTerm);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleOpenCreate = () => {
    setEditingArtist(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (artist) => {
    setEditingArtist(artist);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingArtist(null);
  };

  const handleSave = async (formData) => {
    try {
      if (editingArtist) {
        await updateArtist(editingArtist.id, formData);
        setSnackbar({ open: true, message: 'Artista actualizado', severity: 'success' });
      } else {
        await createArtist(formData);
        setSnackbar({ open: true, message: 'Artista creado', severity: 'success' });
      }
      handleCloseForm();
      loadArtists(searchTerm);
    } catch (err) {
      setSnackbar({ open: true, message: 'Error al guardar el artista', severity: 'error' });
    }
  };

  const handleOpenDeleteConfirm = (artist) => {
    setArtistToDelete(artist);
    setConfirmOpen(true);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setArtistToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteArtist(artistToDelete.id);
      setSnackbar({ open: true, message: 'Artista eliminado', severity: 'success' });
      setConfirmOpen(false);
      setArtistToDelete(null);
      loadArtists(searchTerm);
    } catch (err) {
      setSnackbar({ open: true, message: 'Error al eliminar el artista', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="h4">Artistas</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>
          Nuevo Artista
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Buscar artista por nombre o país..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          },
        }}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : artists.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 8, opacity: 0.6 }}>
          <AlbumIcon sx={{ fontSize: 56, mb: 2, color: 'text.secondary' }} />
          <Typography color="text.secondary">
            {searchTerm ? 'No se encontraron artistas con ese criterio.' : 'No hay artistas registrados todavía.'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {artists.map((artist) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={artist.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/artists/${artist.id}`)}
              >
                {artist.picture ? (
                  <CardMedia
                    component="img"
                    height="220"
                    image={artist.picture}
                    alt={artist.name}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <EmptyCoverArt />
                )}

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{artist.name}</Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block' }}
                  >
                    {artist.country} · {artist.birth_date}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {artist.biography}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="primary.main"
                    sx={{ mt: 1, display: 'block' }}
                  >
                    ÁLBUMES: {artist.albums ? artist.albums.length : 0}
                  </Typography>
                </CardContent>

                <CardActions>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEdit(artist);
                    }}
                    aria-label="editar"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDeleteConfirm(artist);
                    }}
                    aria-label="eliminar"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <ArtistFormDialog
        open={formOpen}
        artist={editingArtist}
        onClose={handleCloseForm}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Eliminar artista"
        message={`¿Seguro que quieres eliminar a "${artistToDelete?.name}"? Esto también eliminará sus álbumes asociados.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Artists;