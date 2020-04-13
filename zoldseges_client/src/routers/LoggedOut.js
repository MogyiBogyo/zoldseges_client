import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const loggedOutRoute = ({
    component: Component,
    ...otherProps
}) => (
    !!localStorage.getItem("loggedUser") ? <Redirect to="/stocks" /> : <Route render={()=>
    <Component {...otherProps}/>
    } />
);

export default loggedOutRoute;