// Here we configure redux toolkit store
import { configureStore } from "@reduxjs/toolkit";
import { tmdbAPI } from "../services/TMDB";
import genreOrCategoryReducer from "../Features/currentGenreOrCategory";
import userReducer from "../Features/auth";

export default configureStore({
    reducer: {
        [tmdbAPI.reducerPath]: tmdbAPI.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbAPI.middleware),
});