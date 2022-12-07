import axios, { AxiosInstance } from 'axios';

let api: AxiosInstance;

export function createApi() {
  api = axios.create({
    baseURL: 'https://opendata.rdw.nl/resource/',
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  return api;
}
export function useApi() {
  if (!api) {
    createApi();
  }
  return api;
}

export default useApi;
