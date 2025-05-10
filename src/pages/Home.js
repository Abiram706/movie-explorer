import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { Container, Grid } from "@mui/material";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../api/tmdb";

const Home = () => {
  const { movies, setMovies, setLastQuery } = useContext(MovieContext);

  const handleSearch = async (query) => {
    const results = await searchMovies(query);
    setMovies(results);
    setLastQuery(query);
  };

  return (
    <Container>
      <SearchBar onSearch={handleSearch} />
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
