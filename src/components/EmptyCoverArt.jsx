import { Box } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

function EmptyCoverArt({ sx = {} }) {
  return (
    <Box
      sx={{
        height: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(232, 178, 61, 0.06)',
        borderBottom: '1px solid rgba(242, 238, 230, 0.08)',
        ...sx,
      }}
    >
      <MusicNoteIcon sx={{ fontSize: 40, color: 'rgba(232, 178, 61, 0.35)' }} />
    </Box>
  );
}

export default EmptyCoverArt;