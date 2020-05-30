import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

import {store} from '../store';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}){
  const auth = store.getState().auth;
  
  const Layout = auth.signed ? DefaultLayout :  AuthLayout;

  if (!auth.signed && isPrivate){
    return <Redirect to="/" />
  }

  if (auth.signed && !isPrivate){
    return <Redirect to="/dashboard" />
  }

  return <Route 
    {...rest}
    render={props => (
      <Layout>
        <Component {...props}/>
      </Layout>
    )}
  />
}
