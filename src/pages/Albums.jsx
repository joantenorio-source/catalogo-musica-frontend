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
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from '../services/albumsService';
import { getArtists } from '../services/artistsService';
import AlbumFormDialog from '../components/AlbumFormDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyCoverArt from '../components/EmptyCoverArt';

function Albums() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState(null);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const loadData = async (search = '') => {
    setLoading(true);
    try {
      const [albumsData, artistsData] = await Promise.all([getAlbums(search), getArtists()]);
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadData(searchTerm);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

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
      loadData(searchTerm);
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
      loadData(searchTerm);
    } catch (err) {
      setSnackbar({ open: true, message: 'Error al eliminar el álbum', severity: 'error' });
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

      <TextField
        fullWidth
        placeholder="Buscar álbum por título o género..."
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

      {artists.length === 0 && !loading && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Necesitas crear al menos un artista antes de poder crear álbumes.
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : albums.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 8, opacity: 0.6 }}>
          <AlbumIcon sx={{ fontSize: 56, mb: 2, color: 'text.secondary' }} />
          <Typography color="text.secondary">
            {searchTerm ? 'No se encontraron álbumes con ese criterio.' : 'No hay álbumes registrados todavía.'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {albums.map((album) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={album.id}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                onClick={() => navigate(`/albums/${album.id}`)}
              >
                {album.cover ? (
                  <CardMedia
                    component="img"
                    height="140"
                    image={album.cover}
                    alt={album.title}
                  />
                ) : (
                  <EmptyCoverArt />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{album.title}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    {album.artist_name} · {album.release_date}
                  </Typography>
                  <Typography variant="caption" color="primary.main" sx={{ mt: 1, display: 'block' }}>
                    {album.genre?.toUpperCase()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEdit(album);
                    }}
                    aria-label="editar"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDeleteConfirm(album);
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