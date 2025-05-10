import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  return (
    <Card sx={{ width: 250, m: 1, cursor: "pointer" }} component={Link} to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
      <CardMedia
        component="img"
        image={
          movie.poster_path
            ? `${IMG_BASE_URL}${movie.poster_path}`
            : "https://via.placeholder.com/250x375?text=No+Image"
        }
        alt={movie.title}
        height="375"
      />
      <CardContent>
        <Typography variant="h6" noWrap>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Release: {movie.release_date || "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {movie.vote_average || "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
