import { Grid } from '@mui/material';
import React from 'react';
import useStyles from './styles';
import Movie from '../Movie/Movie';

const MovieList = ({ movies }) => {
    const classes = useStyles();
    // console.log('Movie List')

    return (
        <Grid container className={classes.moviesContainer}>
            {movies.results.map((movie, index) => (
                <Movie key={index} movie={movie} index={index} />
            ))}
        </Grid>
    )
}

export default MovieList;