import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.241.135.234:81/',
});

api.interceptors.request.use(function (config) {
  // spinning start to show
  // UPDATE: Add this code to show global loading indicator
  var loading = document.getElementById('loadingIncicator');
  loading.classList.add('loading-indicator');
  loading.style.display = 'block';

  return config
}, function (error) {
  return Promise.reject(error);
});

api.interceptors.response.use(function (response) {

  // spinning hide
  // UPDATE: Add this code to hide global loading indicator
  var loading = document.getElementById('loadingIncicator');
  loading.classList.remove('loading-indicator');
  loading.style.display = 'none';


  return response;
}, function (error) {
  return Promise.reject(error);
});

export default api;