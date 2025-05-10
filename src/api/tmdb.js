import axios from "axios";

const API_KEY = "e0577a6c1f2a9e789f88f51fc6fae2c2"; // Replace with your actual TMDb API key
const BASE_URL = "https://api.themoviedb.org/3";

// Create axios instance with base configuration
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// Get trending movies
export const getTrendingMovies = async () => {
  try {
    const response = await tmdbApi.get('/trending/movie/week');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

// Search for movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

// Get movie details by ID
export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'videos,credits',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Get movie genres list
export const getGenres = async () => {
  try {
    const response = await tmdbApi.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

// Filter movies by genre, year, or rating
export const filterMovies = async (params) => {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        ...params,
        include_adult: false,
        sort_by: 'popularity.desc',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error filtering movies:', error);
    return [];
  }
};

// Handle any API errors gracefully
export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error Response:', error.response.data);
    return `Error: ${error.response.data.status_message || 'Unknown error'}`;
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API No Response:', error.request);
    return 'Error: No response from server. Please check your internet connection.';
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('API Request Error:', error.message);
    return `Error: ${error.message}`;
  }
}