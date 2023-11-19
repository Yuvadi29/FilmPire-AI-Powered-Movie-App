import React from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useEffect } from 'react';
import { ColorModeContext } from '../utils/ToggleColorMode';
import { useContext } from 'react';

const useAlanAI = () => {
    const { setMode } = useContext(ColorModeContext);

    useEffect(() => {
        alanBtn({
            key: 'bb1e1fcd446ae0c6e10b08ccf63c0b352e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, mode }) => {
                if (command === 'changeMode') {
                    if (mode === 'light') {
                        setMode('light');
                    } else {
                        setMode('dark');
                    }
                }
            }
        });
    }, []);

}

export default useAlanAI;