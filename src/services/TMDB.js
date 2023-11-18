// All the calls to TMDB API 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

require('dotenv').config();

// const api_key = process.env.TMDB_API_KEY;
// const page = 1;

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
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {
                // Get movies by Search
                if (searchQuery) {
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=6187eefe4e7289d3efa98940cc920de6`
                }

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

        // Get Movie 
        getMovie: builder.query({
            query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=6187eefe4e7289d3efa98940cc920de6`
        }),

        // Get User Specific List
        getRecommendations: builder.query({
            query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=6187eefe4e7289d3efa98940cc920de6`
        }),

        // Get Actors Details
        getActorDetails: builder.query({
            query: (id) => `person/${id}?api_key=6187eefe4e7289d3efa98940cc920de6`
        }),

        // Get Actor Movies
        getMoviesByActorId: builder.query({
            query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=6187eefe4e7289d3efa98940cc920de6`
        }),

        // Get user Specefic list
        getList: builder.query({
            query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=6187eefe4e7289d3efa98940cc920de6&session_id=${sessionId}&page=${page}`
        }),
    }),
});

export const {
    useGetMoviesQuery,
    useGetGenresQuery,
    useGetMovieQuery,
    useGetRecommendationsQuery,
    useGetActorDetailsQuery,
    useGetMoviesByActorIdQuery,
    useGetListQuery,
} = tmdbAPI;