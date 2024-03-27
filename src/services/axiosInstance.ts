import axios from 'axios';

export const axiosAuth = axios.create();
export const axiosNonAuth = axios.create();

axiosAuth.defaults.baseURL = process.env.BACKEND_ENDPOINT;
axiosNonAuth.defaults.baseURL = process.env.BACKEND_ENDPOINT;

axiosAuth.defaults.headers.common['Content-Type'] = 'application/json';
