import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieIcon from '@mui/icons-material/Movie';

const Favorites = () => {
  const { favorites, toggleFavorite } = useContext(MovieContext);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleRemove = (movie) => {
    setSelectedMovie(movie);
    setDialogOpen(true);
  };

  const confirmRemove = () => {
    if (selectedMovie) {
      toggleFavorite(selectedMovie);
    }
    setDialogOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4, 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 0 } }}>
          <FavoriteIcon color="secondary" sx={{ mr: 2, fontSize: 32 }} />
          <Typography variant="h4" component="h1">
            My Favorites
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          component={RouterLink} 
          to="/"
          startIcon={<MovieIcon />}
        >
          Explore More Movies
        </Button>
      </Paper>

      {favorites.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Your favorites list is empty
          </Typography>
          <Typography variant="body1" paragraph>
            Start exploring movies and add some to your favorites!
          </Typography>
          <Button 
            variant="contained" 
            component={RouterLink} 
            to="/"
            startIcon={<MovieIcon />}
            sx={{ mt: 2 }}
          >
            Browse Movies
          </Button>
        </Paper>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1">
              {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} in your collection
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {favorites.map(movie => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <Box sx={{ position: 'relative' }}>
                  <MovieCard movie={movie} />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      '&:hover': {
                        backgroundColor: 'rgba(211, 47, 47, 0.8)',
                      },
                    }}
                    onClick={() => handleRemove(movie)}
                  >
                    <DeleteIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle>Remove from favorites?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove "{selectedMovie?.title}" from your favorites?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={confirmRemove} color="error" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Favorites;