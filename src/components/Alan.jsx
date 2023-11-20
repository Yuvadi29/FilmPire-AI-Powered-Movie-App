import React from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useEffect } from 'react';
import { ColorModeContext } from '../utils/ToggleColorMode';
import { useContext } from 'react';
import { fetchToken } from '../utils';
import { selectGenreOrCategory, searchMovie } from '../Features/currentGenreOrCategory';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useAlanAI = () => {
    const { setMode } = useContext(ColorModeContext);
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        alanBtn({
            key: 'bb1e1fcd446ae0c6e10b08ccf63c0b352e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
                if (command === 'chooseGenre') {
                    const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());

                    if (foundGenre) {
                        history.push('/');
                        dispatch(selectGenreOrCategory(foundGenre.id));
                    } else {
                        const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;
                        history.push('/');
                        dispatch(selectGenreOrCategory(category));
                    }

                } else if (command === 'changeMode') {
                    if (mode === 'light') {
                        setMode('light');
                    } else {
                        setMode('dark');
                    }
                } else if (command === 'login') {
                    fetchToken();
                } else if (command === 'logout') {
                    localStorage.clear();
                    history.push('/');
                } else if (command === 'search') {
                    dispatch(searchMovie(query));
                }
            },
        });
    }, []);

}

export default useAlanAI;