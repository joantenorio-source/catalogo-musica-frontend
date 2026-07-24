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
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from '../services/albumsService';
import { getArtists } from '../services/artistsService';
import AlbumFormDialog from '../components/AlbumFormDialog';
import ConfirmDialog from '../components/ConfirmDialog';

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState(null);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const loadData = async () => {
    setLoading(true);
    try {
      const [albumsData, artistsData] = await Promise.all([getAlbums(), getArtists()]);
      setAlbums(albumsData);
      setArtists(artistsData);
    } catch (err) {
      setSnackbar({ open: true, message: 'Error al cargar álbumes', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingAlbum(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (album) => {
    setEditingAlbum(album);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingAlbum(null);
  };

  const handleSave = async (formData) => {
    try {
      if (editingAlbum) {
        await updateAlbum(editingAlbum.id, formData);
        setSnackbar({ open: true, message: 'Álbum actualizado', severity: 'success' });
      } else {
        await createAlbum(formData);
        setSnackbar({ open: true, message: 'Álbum creado', severity: 'success' });
      }
      handleCloseForm();
      loadData();
    } catch (err) {
      setSnackbar({ open: true, message: 'Error al guardar el álbum', severity: 'error' });
    }
  };

  const handleOpenDeleteConfirm = (album) => {
    setAlbumToDelete(album);
    setConfirmOpen(true);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setAlbumToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAlbum(albumToDelete.id);
      setSnackbar({ open: true, message: 'Álbum eliminado', severity: 'success' });
      setConfirmOpen(false);
      setAlbumToDelete(null);
      loadData();
    } catch (err) {
      setSnackbar({ open: true, message: 'Error al eliminar el álbum', severity: 'error' });
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Álbumes</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          disabled={artists.length === 0}
        >
          Nuevo Álbum
        </Button>
      </Box>

      {artists.length === 0 && !loading && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Necesitas crear al menos un artista antes de poder crear álbumes.
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : albums.length === 0 ? (
        <Typography color="text.secondary">No hay álbumes registrados todavía.</Typography>
      ) : (
        <Grid container spacing={2}>
          {albums.map((album) => (
            <Grid item xs={12} sm={6} md={4} key={album.id}>
              <Card>
                {album.cover && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={album.cover}
                    alt={album.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{album.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {album.artist_name} · {album.release_date}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Género: {album.genre}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleOpenEdit(album)} aria-label="editar">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDeleteConfirm(album)} aria-label="eliminar">
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <AlbumFormDialog
        open={formOpen}
        album={editingAlbum}
        artists={artists}
        onClose={handleCloseForm}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Eliminar álbum"
        message={`¿Seguro que quieres eliminar "${albumToDelete?.title}"?`}
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

export default Albums;