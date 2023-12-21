import axios from 'axios';

export const fetchData = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:3000/api/apartments/get-all-apartments');
        dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'FETCH_DATA_FAILURE', payload: error });
    }
};