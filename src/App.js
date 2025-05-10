import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
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
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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