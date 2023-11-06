import React from 'react';
import { userSelector } from '../../Features/auth';
import { useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { ExitToApp } from '@mui/icons-material';


const Profile = () => {
  const { user } = useSelector(userSelector);

  const logout = () => {
    localStorage.clear();

    window.location.href = '/';
  };

  const favoriteMovies = [];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant='h4' gutterBottom>
          My Profile
        </Typography>
        <Button color='inherit' onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies.length
        ? <Typography variant='h5'>Add Favorites or Watch List some movies to see them here </Typography>
        : <Box>FAVORITE MOVIES</Box>
      }
    </Box>
  )

}

export default Profile;