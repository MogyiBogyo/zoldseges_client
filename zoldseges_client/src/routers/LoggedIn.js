import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Navbar from '../components/UI/Navbar/Navbar';

const loggedInRoute = ({
    component: Component,
    role: Role,
    ...otherProps
}) => (
    !localStorage.getItem("loggedUser") ? <Redirect to="/" /> : ( !!Role && Role !== localStorage.getItem("loggedUserRole") ? <Redirect to="/stocks" /> :  <>
        <Navbar />
        <Route render= { () => <Component {...otherProps} /> } />
    </>)
);

export default loggedInRoute;