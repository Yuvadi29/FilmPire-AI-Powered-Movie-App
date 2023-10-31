import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';


const Movies = () => {

  const { data } = useGetMoviesQuery();

  console.log(data);

  return (
    <div>Movies</div>
  )
}

export default Movies;