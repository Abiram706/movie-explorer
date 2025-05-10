import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, Container } from '@mui/material';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favourites.js';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import { MovieProvider, MovieContext } from './context/MovieContext';

// App wrapper that provides theme based on dark mode context
const AppContent = () => {
  const { darkMode } = useContext(MovieContext);

  // Create a theme instance based on dark/light mode preference
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#3f51b5',
      },
      secondary: {
        main: darkMode ? '#f48fb1' : '#f50057',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box sx={{ pt: 8, pb: 4 }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

// Main App component that wraps everything with providers
function App() {
  return (
    <MovieProvider>
      <Router>
        <AppContent />
      </Router>
    </MovieProvider>
  );
}

export default App;
