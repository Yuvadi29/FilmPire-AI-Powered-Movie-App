import { React } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import store from './app/store';
import './index.css';
import ToggleColorModeProvider from './utils/ToggleColorMode';

ReactDOM.render(
    <Provider store={store}>
        <ToggleColorModeProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ToggleColorModeProvider>
    </Provider>,
    document.getElementById('root'));