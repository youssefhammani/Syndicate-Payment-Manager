import axios from 'axios';

// const apiUrl = 'http://localhost:3000/api';
const BASE_URL = 'http://localhost:3000/api';

const axiosConfig = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
};

const makeApiRequest = async (endpoint, data = null, method = 'get') => {
    try {
        const response = await axios({
            method,
            url: `${BASE_URL}/${endpoint}`,
            data,
            ...axiosConfig,
        });

        return response.data;
    } catch (error) {
        console.error(`Error in ${method} ${endpoint}`, error);
        throw error;
    }
};


export default makeApiRequest;
