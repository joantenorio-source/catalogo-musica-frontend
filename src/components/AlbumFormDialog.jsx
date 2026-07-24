import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
  Avatar,
  Box,
} from '@mui/material';

const emptyForm = {
  title: '',
  release_date: '',
  genre: '',
  artist: '',
};

function AlbumFormDialog({ open, album, artists, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [coverFile, setCoverFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (album) {
      setForm({
        title: album.title || '',
        release_date: album.release_date || '',
        genre: album.genre || '',
        artist: album.artist || '',
      });
      setPreviewUrl(album.cover || '');
    } else {
      setForm(emptyForm);
      setPreviewUrl('');
    }
    setCoverFile(null);
  }, [album, open]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('release_date', form.release_date);
    formData.append('genre', form.genre);
    formData.append('artist', form.artist);
    if (coverFile) {
      formData.append('cover', coverFile);
    }
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{album ? 'Editar álbum' : 'Nuevo álbum'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={previewUrl} variant="rounded" sx={{ width: 64, height: 64 }} />
            <Button variant="outlined" component="label">
              Subir portada
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
          </Box>
          <TextField
            label="Título"
            fullWidth
            value={form.title}
            onChange={handleChange('title')}
            required
          />
          <TextField
            label="Fecha de lanzamiento"
            type="date"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            value={form.release_date}
            onChange={handleChange('release_date')}
            required
          />
          <TextField
            label="Género"
            fullWidth
            value={form.genre}
            onChange={handleChange('genre')}
            required
          />
          <TextField
            label="Artista"
            select
            fullWidth
            value={form.artist}
            onChange={handleChange('artist')}
            required
          >
            {artists.map((artist) => (
              <MenuItem key={artist.id} value={artist.id}>
                {artist.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlbumFormDialog;