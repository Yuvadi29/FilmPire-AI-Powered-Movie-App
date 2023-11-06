import axios from "axios";

export const moviesApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '6187eefe4e7289d3efa98940cc920de6',
    },
});

export const fetchToken = async () => {
    try {
        const { data: { session_id, request_token, success } } = await moviesApi.get('/authentication/token/new');

        if (success) {
            // Store the token in the local storage
            localStorage.setItem('request_token', request_token);

            window.location.href = `https://themoviedb.org/authenticate/${request_token}?redirect_to=${window.location.origin}/approved`;
        }
    } catch (error) {
        console.log("Sorry, Token could not be created: ", error);
    }
}

export const createSessionId = async () => {
    const token = localStorage.getItem('request_token');

    if (token) {
        try {
            const { data: { session_id } } = await moviesApi.post('/authentication/session/new', {
                request_token: token,
            });
            localStorage.setItem('session_id', session_id);
            return session_id;
        } catch (error) {
            console.log("Error Found", error);
        }
    }
}
