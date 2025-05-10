import React, { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [lastQuery, setLastQuery] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Toggle favorite status of a movie
  const toggleFavorite = (movie) => {
    setFavorites(prevFavorites => {
      const exists = prevFavorites.some(fav => fav.id === movie.id);
      
      if (exists) {
        return prevFavorites.filter(fav => fav.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        trendingMovies,
        setTrendingMovies,
        lastQuery,
        setLastQuery,
        favorites,
        toggleFavorite,
        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;