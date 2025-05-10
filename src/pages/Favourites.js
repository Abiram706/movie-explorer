import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { Container, Grid, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const { favorites } = useContext(MovieContext);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Favorites
      </Typography>
      {favorites.length === 0 ? (
        <Typography variant="body1">No favorite movies yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;
