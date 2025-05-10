import React, { useState, useEffect, useContext } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  CircularProgress,
  Tabs,
  Tab,
  Button
} from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { getTrendingMovies, searchMovies, filterMovies } from '../api/tmdb';
import { MovieContext } from '../context/MovieContext';

const Home = () => {
  const { 
    movies, 
    setMovies, 
    trendingMovies, 
    setTrendingMovies,
    lastQuery, 
    setLastQuery 
  } = useContext(MovieContext);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Load trending movies on initial render
  useEffect(() => {
    const loadTrending = async () => {
      try {
        setLoading(true);
        const results = await getTrendingMovies();
        setTrendingMovies(results);
        setLoading(false);
      } catch (err) {
        setError('Failed to load trending movies. Please try again later.');
        setLoading(false);
      }
    };

    loadTrending();
  }, [setTrendingMovies]);

  const handleSearch = async (query, filters = {}) => {
    try {
      setLoading(true);
      setLastQuery(query);
      setPage(1);
      
      let results;
      if (filters.genre || filters.year || filters.rating) {
        // Apply filters
        const filterParams = {
          with_genres: filters.genre || undefined,
          primary_release_year: filters.year || undefined,
          'vote_average.gte': filters.rating || undefined,
          ...(query ? { query } : {})
        };
        
        results = await filterMovies(filterParams);
      } else {
        // Simple search
        results = await searchMovies(query);
      }
      
      setMovies(results);
      setActiveTab(1); // Switch to search results tab
      setHasMore(results.length === 20); // TMDb typically returns 20 results per page
      setLoading(false);
    } catch (err) {
      setError('Failed to search movies. Please try again later.');
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const additionalResults = await searchMovies(lastQuery, nextPage);
      
      if (additionalResults.length === 0) {
        setHasMore(false);
      } else {
        setMovies(prevMovies => [...prevMovies, ...additionalResults]);
        setPage(nextPage);
        setHasMore(additionalResults.length === 20);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load more movies. Please try again later.');
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
      <SearchBar onSearch={handleSearch} />
      
      {error && (
        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      
      <Box sx={{ width: '100%', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Trending" />
          {lastQuery && <Tab label={`Results for "${lastQuery}"`} />}
        </Tabs>
      </Box>
      
      {loading && movies.length === 0 && trendingMovies.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {activeTab === 0 && (
            <>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Trending Movies
              </Typography>
              <Grid container spacing={3}>
                {trendingMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </Grid>
            </>
          )}
          
          {activeTab === 1 && movies.length > 0 && (
            <>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Search Results
              </Typography>
              <Grid container spacing={3}>
                {movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </Grid>
              
              {hasMore && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button 
                    variant="contained" 
                    onClick={loadMore}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Load More'}
                  </Button>
                </Box>
              )}
            </>
          )}
          
          {activeTab === 1 && movies.length === 0 && (
            <Typography sx={{ textAlign: 'center', mt: 4 }}>
              No movies found for "{lastQuery}". Try a different search term.
            </Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;