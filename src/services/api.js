import React from 'react';
import axios from 'axios';
import WaveLoading from 'react-loadingg/lib/WaveLoading';
import http from 'http';

const api = axios.create({
  baseURL: 'http://gotattoo.nodejs7003.uni5.net:21051',
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
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