// All the calls to TMDB API 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

require('dotenv').config();

// const api_key = process.env.TMDB_API_KEY;
const page = 1;

export const tmdbAPI = createApi({
    reducerPath: 'tmdbAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({

        //Get Genres
        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=6187eefe4e7289d3efa98940cc920de6`,
        }),

        //Get Movies by [Type]
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page }) => {
                // Get movies by Category 
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=6187eefe4e7289d3efa98940cc920de6`
                }
                // Get movies by Genre
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=6187eefe4e7289d3efa98940cc920de6`
                }
                // Get Popular Movies
                return `movie/popular?page=${page}&api_key=6187eefe4e7289d3efa98940cc920de6`;
            }
        }),
    }),
});

export const {
    useGetMoviesQuery,
    useGetGenresQuery,
} = tmdbAPI;