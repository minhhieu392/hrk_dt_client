import axios from 'axios';
import _ from 'lodash';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // withCredentials: true
});

const createError = (httpStatusCode, statusCode, errorMessage, problems, errorCode = '') => {
    const error = new Error();
    error.httpStatusCode = httpStatusCode;
    error.statusCode = statusCode;
    error.errorMessage = errorMessage;
    error.problems = problems;
    error.errorCode = errorCode + "";
    return error;
};


instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        const { data } = response;
        
        return response.data;
    }
);

export default instance;
