// Here we configure redux toolkit store
import { configureStore } from "@reduxjs/toolkit";
import { tmdbAPI } from "../services/TMDB";

export default configureStore({
    reducer: {
        [tmdbAPI.reducerPath]: tmdbAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbAPI.middleware),
});
