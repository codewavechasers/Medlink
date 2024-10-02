import axios from 'axios';

const App = axios.create({
    // baseURL: 'https://gregory-retention-dimensional-identity.trycloudflare.com', 
    baseURL: 'http://127.0.0.1:8000', 
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, 
});

export default App;