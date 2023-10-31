// All the calls to TMDB API 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

require('dotenv').config();

// const api_key = process.env.TMDB_API_KEY;
const page = 1;

export const tmdbAPI = createApi({
    reducerPath: 'tmdbAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        //Get Movies by [Type]
        getMovies: builder.query({
            // query: () => `movie/popular?page=${page}&api_key=${api_key}`,
            query: () => `movie/popular?page=${page}&api_key=6187eefe4e7289d3efa98940cc920de6`,
        }),
    }),
});

export const {
    useGetMoviesQuery,
} = tmdbAPI;