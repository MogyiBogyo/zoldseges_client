import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { navigateToCustomPath } from '../../../App';

class Navbar extends Component {

    handleLogOut = (event) => {
        event.preventDefault();
        localStorage.removeItem("loggedUser");
        navigateToCustomPath("/");
    }
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
                            <NavLink to="/stocks" className={"nav-link"} activeClassName={"active"} >Készlet</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to="/products" className={"nav-link"} activeClassName={"active"} >Termékek</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to="/categories" className={"nav-link"} activeClassName={"active"} >Kategóriák</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to="/orders" className={"nav-link"} activeClassName={"active"} >Rendelés</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to="/sales" className={"nav-link"} activeClassName={"active"} >Eladás</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to="/users" className={"nav-link"} activeClassName={"active"} >Felhasználók</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to="/incomes" className={"nav-link"} activeClassName={"active"} >Árubevétel</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to="/worktimes" className={"nav-link"} activeClassName={"active"} >Beosztás</NavLink>
                        </li>


                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item ">
                            <NavLink to="/" className={"nav-link"} activeClassName={"active"} onClick={(event) => this.handleLogOut(event)} >Kijelentkezés</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}


export default Navbar;