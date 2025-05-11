import React, { useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Tooltip,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MovieIcon from '@mui/icons-material/Movie';
import { MovieContext } from '../context/MovieContext';

const Navbar = () => {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useContext(MovieContext);

  return (
    <AppBar position="static" sx={{ backgroundColor: darkMode ? '#1e1e1e' : '#3f51b5' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MovieIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MOVIE EXPLORER
          </Typography>

          {/* Mobile logo */}
          <MovieIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MOVIES
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: { xs: 'flex-end', md: 'center' } }}>
            <Tooltip title="Home">
              <IconButton
                component={RouterLink}
                to="/"
                color={location.pathname === '/' ? 'secondary' : 'inherit'}
                sx={{ mr: 1 }}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Favorites">
              <IconButton
                component={RouterLink}
                to="/favorites"
                color={location.pathname === '/favorites' ? 'secondary' : 'inherit'}
              >
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <IconButton onClick={toggleDarkMode} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;