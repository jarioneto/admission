import axios from 'axios';
import { ENVIROMENT } from '~/constants/enviroment';

const http = axios.create({
  baseURL: ENVIROMENT.API_URL,
  headers: {
    Accept: 'application/json'
  },
  timeout: 5000
});

export default http;