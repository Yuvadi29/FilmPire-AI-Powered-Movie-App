import React from 'react';
import { userSelector } from '../../Features/auth';
import { useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { ExitToApp } from '@mui/icons-material';
import { useGetListQuery } from '../../services/TMDB';
import RatedCards from '../RatedCards/RatedCards';


const Profile = () => {
  const { user } = useSelector(userSelector);

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  const { data: watchListMovies, refetch: refetchWatchListed } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  useEffect(() => {
    refetchFavorites();
    refetchWatchListed();
  }, []);

  const logout = () => {
    localStorage.clear();

    window.location.href = '/';
  };

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
      {!favoriteMovies?.results?.length && !watchListMovies?.results?.length
        ? <Typography variant='h5'>Add Favorites or Watch List some movies to see them here </Typography>
        : <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="WatchListed Movies" data={watchListMovies} />
        </Box>
      }
    </Box>
  )

}

export default Profile;