import axios from 'axios';

export const axiosAuth = axios.create();
export const axiosNonAuth = axios.create();

axiosAuth.defaults.baseURL = process.env.BACKEND_ENDPOINT;
axiosNonAuth.defaults.baseURL = process.env.BACKEND_ENDPOINT;

axiosAuth.defaults.headers.common['Content-Type'] = 'application/json';

export const updateAccessToken = (access: string) => {
  axiosAuth.interceptors.request.clear();
  axiosAuth.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${access}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
};
