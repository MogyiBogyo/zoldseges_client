import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Navbar from '../components/UI/Navbar/Navbar';

const loggedInRoute = ({
    component: Component,
    ...otherProps
}) => (
    !localStorage.getItem("loggedUser") ? <Redirect to="/" /> : <>
        <Navbar />
        <Route render= { () => <Component {...otherProps} /> } />
    </>
);

export default loggedInRoute;