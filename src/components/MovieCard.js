import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  IconButton, 
  Grid,
  Tooltip,
  Box
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { MovieContext } from '../context/MovieContext';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }) => {
  const { favorites, toggleFavorite, darkMode } = useContext(MovieContext);
  
  const isFavorited = favorites.some(fav => fav.id === movie.id);
  
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'transform 0.2s ease-in-out',
          backgroundColor: darkMode ? '#333' : '#fff',
          color: darkMode ? '#fff' : '#000',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: 6
          }
        }}
        elevation={3}
      >
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <CardMedia
            component="img"
            height="300"
            image={movie.poster_path 
              ? `${IMG_BASE_URL}${movie.poster_path}` 
              : 'https://via.placeholder.com/300x450?text=No+Image'
            }
            alt={movie.title}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" gutterBottom noWrap>
              {movie.title}
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <StarIcon sx={{ color: '#FFD700', mr: 1 }} />
              <Typography variant="body2">
                {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
              </Typography>
              <Typography variant="body2" sx={{ ml: 'auto' }}>
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              color={darkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary'}
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                height: '4.5em',
              }}
            >
              {movie.overview || 'No description available.'}
            </Typography>
          </CardContent>
        </Link>
        <CardActions disableSpacing>
          <Tooltip title={isFavorited ? "Remove from favorites" : "Add to favorites"}>
            <IconButton 
              aria-label="add to favorites"
              onClick={() => toggleFavorite(movie)}
              sx={{ color: isFavorited ? '#ff6d75' : 'inherit' }}
            >
              {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MovieCard;