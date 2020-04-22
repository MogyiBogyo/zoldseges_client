import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { navigateToCustomPath } from '../../../App';
import 'react-dropdown/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarrot } from '@fortawesome/free-solid-svg-icons';

class Navbar extends Component {

    state = {
        showUserInfo: false,
        showMobileMenu: false
    }
    handleLogOut = (event) => {
        event.preventDefault();
        localStorage.removeItem("loggedUser");
        //localStorage.removeItem("loggedUserRole");
        //localStorage.removeItem("loggedUserName");
        //localStorage.removeItem("loggedUserFamilyName");
        //localStorage.removeItem("loggedUserGivenName");
        //localStorage.clear();
        navigateToCustomPath("/");
    }
    render() {
        const dropdownStyle = {
            color: "black",
            backgroundColor: "white",
            padding: "0 10px 0 10px",
            fontFamily: "Arial",
            marginRight: "5"

        }


        let loggedUserRole = localStorage.getItem("loggedUserRole");
        let loggedUserFamilyname = localStorage.getItem("loggedUserFamilyName");
        let loggedUserGivenName = localStorage.getItem("loggedUserGivenName");

        return (
            <nav className="navbar navbar-expand-lg navbar-toggleable-mb navbar-light bg-light" style={{ backgroundColor: "#e3f2fd" }}>
                <a className="navbar-brand" href="/stocks">
                    <FontAwesomeIcon icon={faCarrot} className={"mx-2"} />
                    Zöldséges</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation"
                    onClick={() => this.setState({
                        showMobileMenu: !this.state.showMobileMenu
                    })}
                >
                    <span className="navbar-toggler-icon">

                    </span>
                </button>

                <div className={`collapse navbar-collapse ${this.state.showMobileMenu ? "show" : ""}`} id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto ">
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
                            <NavLink to="/incomes" className={"nav-link"} activeClassName={"active"} >Árubevétel</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to="/plans" className={"nav-link"} activeClassName={"active"} >Tervezett rendelések</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to="/sales" className={"nav-link"} activeClassName={"active"} >Eladás</NavLink>
                        </li>
                        {loggedUserRole === "ROLE_ADMIN" ? <li className="nav-item ">
                            <NavLink to="/users" className={"nav-link"} activeClassName={"active"} >Felhasználók</NavLink>
                        </li> : null}

                        <li className="nav-item ">
                            <NavLink to="/worktimes" className={"nav-link"} activeClassName={"active"} >Beosztás</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">

                        <li className={`nav-item dropdown dropleft ${this.state.showUserInfo ? "show" : ""}`}>
                            <a className="nav-link dropdown-toggle dropleft " href="#"
                                id="navbarDropdown"
                                onClick={() => this.setState({
                                    showUserInfo: !this.state.showUserInfo
                                })}
                            >
                                {loggedUserFamilyname} {loggedUserGivenName}
                            </a>
                            <div className={`dropdown-menu dropleft ${this.state.showUserInfo ? "show" : ""}`} aria-labelledby="navbarDropdown">
                                <NavLink to="/" className={"dropdown-item "} style={dropdownStyle} activeClassName={"active"} onClick={(event) => this.handleLogOut(event)} >Kijelentkezés</NavLink>
                            </div>

                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}


export default Navbar;