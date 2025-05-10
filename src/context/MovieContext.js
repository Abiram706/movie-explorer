import React, { createContext, useState, useEffect } from "react";
import { fetchTrendingMovies, searchMovies } from "../api/tmdb";

// Create the context
export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [darkMode, setDarkMode] = useState(false);
  const [lastQuery, setLastQuery] = useState(
    localStorage.getItem("lastQuery") || ""
  );

  useEffect(() => {
    if (lastQuery) {
      searchMovies(lastQuery).then(setMovies);
    } else {
      fetchTrendingMovies().then(setMovies);
    }
  }, [lastQuery]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("lastQuery", lastQuery);
  }, [lastQuery]);

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.id === movie.id);
      return exists
        ? prev.filter((fav) => fav.id !== movie.id)
        : [...prev, movie];
    });
  };

  const value = {
    movies,
    setMovies,
    favorites,
    toggleFavorite,
    darkMode,
    setDarkMode,
    lastQuery,
    setLastQuery,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
