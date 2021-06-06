import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bexpress-api.azurewebsites.net/api/'
});

export default api;