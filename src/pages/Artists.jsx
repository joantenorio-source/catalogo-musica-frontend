import { useState, useEffect } from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import {
  getArtists,
  createArtist,
  updateArtist,
  deleteArtist,
} from '../services/artistsService';
import ArtistFormDialog from '../components/ArtistFormDialog';
import ConfirmDialog from '../components/ConfirmDialog';

function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [artistToDelete, setArtistToDelete] = useState(null);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const loadArtists = async () => {
    setLoading(true);
    try {
      const data = await getArtists();
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
      loadArtists();
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
      loadArtists();
    } catch (err) {
      setSnackbar({ open: true, message: 'Error al eliminar el artista', severity: 'error' });
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Artistas</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>
          Nuevo Artista
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : artists.length === 0 ? (
        <Typography color="text.secondary">No hay artistas registrados todavía.</Typography>
      ) : (
        <Grid container spacing={2}>
          {artists.map((artist) => (
            <Grid item xs={12} sm={6} md={4} key={artist.id}>
              <Card>
                {artist.picture && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={artist.picture}
                    alt={artist.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{artist.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {artist.country} · {artist.birth_date}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {artist.biography}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Álbumes: {artist.albums ? artist.albums.length : 0}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleOpenEdit(artist)} aria-label="editar">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDeleteConfirm(artist)} aria-label="eliminar">
                    <DeleteIcon />
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