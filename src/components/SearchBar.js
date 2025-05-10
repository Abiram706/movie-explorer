import React, { useState, useContext } from 'react';
import { 
  Paper, 
  InputBase, 
  IconButton, 
  Box,
  FormControl,
  Select,
  MenuItem,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { MovieContext } from '../context/MovieContext';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  
  const { darkMode } = useContext(MovieContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, { genre, year, rating });
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Generate year options from 1900 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

  // Rating options 1-10
  const ratings = Array.from({ length: 10 }, (_, i) => i + 1);

  // Sample genres - in a real app, these would come from the API
  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 18, name: 'Drama' },
    { id: 14, name: 'Fantasy' },
    { id: 27, name: 'Horror' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 53, name: 'Thriller' }
  ];

  return (
    <Box sx={{ my: 4 }}>
      <Paper
        component="form"
        sx={{ 
          p: '2px 4px', 
          display: 'flex', 
          alignItems: 'center',
          width: '100%',
          backgroundColor: darkMode ? '#333' : '#fff',
          color: darkMode ? '#fff' : '#000',
        }}
        elevation={3}
        onSubmit={handleSubmit}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, color: 'inherit' }}
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton type="submit" aria-label="search" sx={{ color: 'inherit' }}>
          <SearchIcon />
        </IconButton>
        <IconButton 
          aria-label="filters" 
          onClick={toggleFilters}
          sx={{ color: showFilters ? 'primary.main' : 'inherit' }}
        >
          <FilterListIcon />
        </IconButton>
      </Paper>

      {showFilters && (
        <Paper 
          sx={{ 
            mt: 2, 
            p: 2,
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#fff' : '#000',
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Filter movies by:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <Select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Genre' }}
                sx={{ 
                  backgroundColor: darkMode ? '#444' : '#f5f5f5',
                  color: 'inherit',
                  '.MuiSelect-icon': { color: 'inherit' }
                }}
              >
                <MenuItem value="">All Genres</MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }} size="small">
              <Select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Year' }}
                sx={{ 
                  backgroundColor: darkMode ? '#444' : '#f5f5f5',
                  color: 'inherit',
                  '.MuiSelect-icon': { color: 'inherit' }
                }}
              >
                <MenuItem value="">All Years</MenuItem>
                {years.slice(0, 30).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }} size="small">
              <Select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Rating' }}
                sx={{ 
                  backgroundColor: darkMode ? '#444' : '#f5f5f5',
                  color: 'inherit',
                  '.MuiSelect-icon': { color: 'inherit' }
                }}
              >
                <MenuItem value="">All Ratings</MenuItem>
                {ratings.map((rating) => (
                  <MenuItem key={rating} value={rating}>
                    {rating}+
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;