import axios from 'axios';

const App = axios.create({
    baseURL: 'http://gilbert-keter-medlink-backend-1f0e71-da92b5-213-199-42-123.traefik.me', 
    // baseURL: 'http://127.0.0.1:8000', 
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, 
});

export default App;