import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'

interface Props {
  open: boolean;
  title?: string;
  imageUrl?: string | null;
  loading?: boolean;
  onClose: () => void;
}

export function ImageModal({ open, title, imageUrl, loading, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 200,
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : imageUrl ? (
            <Box
              component="img"
              src={imageUrl}
              alt={title ?? 'Image'}
              sx={{ maxWidth: '100%', maxHeight: 400, objectFit: 'contain' }}
            />
          ) : (
            <Typography color="text.secondary">No image available</Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}
