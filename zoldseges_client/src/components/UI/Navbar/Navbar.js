import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Zöldséges</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">

                    </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item ">
                            <NavLink to="/stocks" activeClassName={"active"} >Készlet</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to="/products" activeClassName={"active"} >Termékek</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to="/order" activeClassName={"active"} >Rendelés</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to="/sell" activeClassName={"active"} >Eladás</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to="/users" activeClassName={"active"} >Felhasználók</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}


export default Navbar;