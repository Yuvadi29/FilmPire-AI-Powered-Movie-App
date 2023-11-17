import { Button, Typography } from '@mui/material';
import React from 'react';
import useStyles from './styles';

const Pagination = ({ currentPage, totalPages, setPage }) => {
    const classes = useStyles();

    const handlePrev = () => {
        if (currentPage !== 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage !== totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    if (totalPages === 0) return null;
    return (
        <div className={classes.container}>
            <Button onClick={handlePrev} className={classes.button} variant='contained' color='primary' type='button'>
                Previous
            </Button>
            <Typography className={classes.pageNumber} variant='h4'>{currentPage}</Typography>
            <Button onClick={handleNext} className={classes.button} variant='contained' color='primary' type='button'>
                Next
            </Button>
        </div>
    )
}

export default Pagination;
