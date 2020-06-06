import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        <Redirect to={{ pathname: '/homepage', state: { from: props.location } }} />
    )} />
)
