import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Avatar,
  Box,
} from '@mui/material';

const emptyForm = {
  name: '',
  country: '',
  birth_date: '',
  biography: '',
};

function ArtistFormDialog({ open, artist, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [pictureFile, setPictureFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (artist) {
      setForm({
        name: artist.name || '',
        country: artist.country || '',
        birth_date: artist.birth_date || '',
        biography: artist.biography || '',
      });
      setPreviewUrl(artist.picture || '');
    } else {
      setForm(emptyForm);
      setPreviewUrl('');
    }
    setPictureFile(null);
  }, [artist, open]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPictureFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('country', form.country);
    formData.append('birth_date', form.birth_date);
    formData.append('biography', form.biography);
    if (pictureFile) {
      formData.append('picture', pictureFile);
    }
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{artist ? 'Editar artista' : 'Nuevo artista'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={previewUrl} sx={{ width: 64, height: 64 }} />
            <Button variant="outlined" component="label">
              Subir imagen
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
          </Box>
          <TextField
            label="Nombre"
            fullWidth
            value={form.name}
            onChange={handleChange('name')}
            required
          />
          <TextField
            label="País"
            fullWidth
            value={form.country}
            onChange={handleChange('country')}
            required
          />
          <TextField
            label="Fecha de nacimiento"
            type="date"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            value={form.birth_date}
            onChange={handleChange('birth_date')}
            required
          />
          <TextField
            label="Biografía"
            fullWidth
            multiline
            rows={3}
            value={form.biography}
            onChange={handleChange('biography')}
          />
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

export default ArtistFormDialog;
