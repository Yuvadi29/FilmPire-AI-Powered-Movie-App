import { TextField, InputAdornment } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useStyles from './styles';
import { searchMovie } from '../../Features/currentGenreOrCategory';

const Search = () => {
    const classes = useStyles();
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const location = useLocation();

    const handleKeyPress = (e) => {
        // If i press enter , it will do this
        if (e.key === 'Enter') {
            // console.log(query);
            dispatch(searchMovie(query));
        }
    }

    if (location.pathname !== '/') return null;
    
    return (
        <div className={classes.searchContainer}>
            <TextField
                onKeyPress={handleKeyPress}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant='standard'
                InputProps={{
                    className: classes.input,
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
        </div>
    )
}

export default Search;