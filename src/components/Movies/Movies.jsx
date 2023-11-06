import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import { selectGenreOrCategory } from '../../Features/currentGenreOrCategory';


const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });


  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    )
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant='h4'>No Movies Match That Name
          <br /> Kindly Search for Something Else</Typography>
      </Box>
    )
  }

  if (error) return "An Error Has Occured.";

  return (
    <div>
      <MovieList movies={data} />
    </div>
  )
}

export default Movies;