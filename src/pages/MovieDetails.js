import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";
import { MovieContext } from "../context/MovieContext";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { favorites, toggleFavorite } = useContext(MovieContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  const isFavorited = favorites.some((fav) => fav.id === movie?.id);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", marginTop: "2rem" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container sx={{ textAlign: "center", marginTop: "2rem" }}>
        <Typography variant="h6">Movie not found.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        <img
          src={
            movie.poster_path
              ? `${IMG_BASE_URL}${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
          style={{ width: "300px", borderRadius: "12px" }}
        />
        <Box>
          <Typography variant="h4" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {movie.overview}
          </Typography>
          <Typography variant="subtitle1">
            Release Date: {movie.release_date}
          </Typography>
          <Typography variant="subtitle1">
            Rating: {movie.vote_average} / 10
          </Typography>
          <Button
            variant="contained"
            color={isFavorited ? "secondary" : "primary"}
            sx={{ mt: 2 }}
            onClick={() => toggleFavorite(movie)}
          >
            {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default MovieDetails;
