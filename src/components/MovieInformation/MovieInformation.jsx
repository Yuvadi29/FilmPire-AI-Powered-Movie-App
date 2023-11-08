import { Box, Button, ButtonGroup, CircularProgress, Grid, Modal, Rating, Typography, formGroupClasses, useMediaQuery } from '@mui/material';
import React from 'react';
import { Movie as MovieIcon, Theatres, Language, PlusOne, Favorite, FavoriteBorderOutline, Remove, ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useGetMovieQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../Features/currentGenreOrCategory';

const MovieInformation = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const dispatch = useDispatch();


  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has Gone Wrong - Go Back.</Link>
      </Box>
    )
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant='h3' align='center' gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant='h3' align='center' gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant='subtitle1' gutterBottom style={{ marginLeft: '10px' }}>{data?.vote_average} / 10</Typography>
          </Box>
          <Typography variant='h6' align='center' gutterBottom>{data?.runtime} minutes / {data?.spoken_languages.length > 0 ? `${data?.spoken_languages[0].name}` : ''}</Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre, index) => (
            <Link key={genre.name} className={classes.links} to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                alt="genreIcons" className={classes.genreImage} height={30}
              />
              <Typography color="textPrimary" variant='subtitle1'>{genre?.name}</Typography>
            </Link>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MovieInformation;