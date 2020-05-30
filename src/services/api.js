import axios from 'axios' ;

const api = axios.create({
  baseURL: 'https://gotattoo.herokuapp.com',
});

export default api;