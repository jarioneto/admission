import axios from 'axios';

const http = axios.create({
  baseURL: process.env.ADMISSION_API_URL,
  headers: {
    Accept: 'application/json'
  },
  timeout: 5000
});

export default http;