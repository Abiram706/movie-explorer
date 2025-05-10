import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import HomeIcon from '@mui/icons-material/Home';

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 5, textAlign: 'center' }}>
        <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
        
        <Typography variant="h3" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}>
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFound;