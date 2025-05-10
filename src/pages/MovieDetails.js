import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Chip, 
  Button, 
  CircularProgress,
  IconButton,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getMovieDetails } from '../api/tmdb';
import { MovieContext } from '../context/MovieContext';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useContext(MovieContext);
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const result = await getMovieDetails(id);
        setMovie(result);
        // Store the visited movie in localStorage for persistence
        const lastSearched = localStorage.getItem('lastSearchedMovie');
        if (lastSearched !== result.id.toString()) {
          localStorage.setItem('lastSearchedMovie', result.id.toString());
        }
      } catch (err) {
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const isFavorite = favorites.some(fav => fav.id === Number(id));

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !movie) {
    return (
      <Container sx={{ mt: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleGoBack} sx={{ mb: 2 }}>
          Go Back
        </Button>
        <Typography variant="h5" color="error" align="center">
          {error || 'Movie not found'}
        </Typography>
      </Container>
    );
  }

  // Format movie runtime to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Box>
      {/* Backdrop image */}
      {movie.backdrop_path && (
        <Box
          sx={{
            position: 'relative',
            height: { xs: '200px', sm: '300px', md: '400px' },
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`}
            alt={movie.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.4)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              p: { xs: 2, md: 4 },
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              color: 'white',
            }}
          >
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
              {movie.title}
            </Typography>
            {movie.tagline && (
              <Typography variant="subtitle1" sx={{ fontStyle: 'italic', mt: 1 }}>
                {movie.tagline}
              </Typography>
            )}
          </Box>
        </Box>
      )}

      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleGoBack} sx={{ mb: 2 }}>
          Go Back
        </Button>

        {!movie.backdrop_path && (
          <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
            {movie.title}
          </Typography>
        )}

        <Grid container spacing={4}>
          {/* Left column - Poster and quick info */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
              <Box
                component="img"
                src={
                  movie.poster_path
                    ? `${IMG_BASE_URL}${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Poster'
                }
                alt={movie.title}
                sx={{ width: '100%', display: 'block' }}
              />
            </Paper>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                color={isFavorite ? 'secondary' : 'primary'}
                onClick={() => toggleFavorite(movie)}
                sx={{ mb: 2 }}
              >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>

              <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Movie Info
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StarIcon sx={{ color: '#FFD700', mr: 1 }} />
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    Rating:
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({movie.vote_count} votes)
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarTodayIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    Release Date:
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {movie.release_date || 'Unknown'}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    Runtime:
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatRuntime(movie.runtime)}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* Right column - Details */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Overview
              </Typography>
              <Typography variant="body1" paragraph>
                {movie.overview || 'No overview available.'}
              </Typography>

              {movie.genres && movie.genres.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Genres
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {movie.genres.map(genre => (
                      <Chip key={genre.id} label={genre.name} variant="outlined" size="small" />
                    ))}
                  </Box>
                </Box>
              )}

              {movie.production_companies && movie.production_companies.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Production Companies
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {movie.production_companies.map(company => (
                      <Chip key={company.id} label={company.name} variant="outlined" size="small" />
                    ))}
                  </Box>
                </Box>
              )}

              {movie.credits && movie.credits.cast && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Cast
                  </Typography>
                  <Grid container spacing={2}>
                    {movie.credits.cast.slice(0, 6).map(person => (
                      <Grid item xs={6} sm={4} key={person.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            component="img"
                            src={
                              person.profile_path
                                ? `${IMG_BASE_URL}${person.profile_path}`
                                : 'https://via.placeholder.com/50x75?text=No+Image'
                            }
                            alt={person.name}
                            sx={{ width: 50, height: 75, objectFit: 'cover', borderRadius: 1, mr: 2 }}
                          />
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {person.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {person.character}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Show trailer if available */}
              {movie.videos && movie.videos.results && movie.videos.results.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Trailer
                  </Typography>
                  <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 2 }}>
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                      title={`${movie.title} trailer`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    />
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MovieDetails;