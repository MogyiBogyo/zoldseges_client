import React, { Component } from 'react';
import axios from 'axios';
import { navigateToCustomPath } from "../../App";

class Login extends Component {
    state = {
        username: "",
        password: "",
        userRole: "",
        userNameError: false,
        passwordError: false
    };




    handleLogin = (event) => {
        event.preventDefault();
        if (this.state.username === "") {
            this.setState({
                userNameError: true,
            });
            return
        } else {
            this.setState({
                userNameError: false,
            })
        }
        if (this.state.password === "" || this.state.password.length < 6) {
            this.setState({
                passwordError: true,
            });
            return
        } else {
            this.setState({
                passwordError: false
            })
        }

        const token = Buffer.from(`${this.state.username}:${this.state.password}`, 'utf8').toString('base64')

        /* Send to backend the credentials */
        console.log(this.state.username + '    ' + this.state.password);
        axios.post(process.env.REACT_APP_BACKEND_URL + "/users/login", {
            auth: {
                username: this.state.username,
                password: this.state.password
            }
        }, {
            withCredentials: true,
            headers: {
                'Authorization': `Basic ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
        ).then(value => {
            console.log(value)
            /* if get token save data for handle role */
            localStorage.setItem("loggedUser", token);
            if (!!value.data.role) {
                localStorage.setItem("loggedUserRole", value.data.role);
                localStorage.setItem("loggedUserName", value.data.username);
                localStorage.setItem("loggedUserFamilyName", value.data.familyname);
                localStorage.setItem("loggedUserGivenName", value.data.givenname);

            }
            /* Redirect to  first page */
            console.log(localStorage.getItem("loggedUserRole"));
            navigateToCustomPath("/stocks");
        })
            .catch(reason => console.log("axios error", reason));
    };



    render() {
        //console.log("url ", process.env.REACT_APP_BACKEND_URL);
        return (
            <div className={"d-flex flex-grow-1 align-items-center justify-content-center h-100 flex-column"}>
                <h3 className={"text-center py-3"}>
                    Zöldséges rendszer
                </h3>
                <form onSubmit={event => this.handleLogin(event)}>
                    <div className="form-group">
                        <label htmlFor="username">Felhasználónév</label>
                        <input
                            type="text"
                            className={`form-control ${this.state.userNameError ? "invalid" : ""}`}
                            id="username"
                            onChange={event => this.setState({
                                username: event.target.value.trim()
                            })}
                        />
                        {
                            this.state.userNameError ? <div className="invalid-feedback d-block">
                                A felhasználónév nem megfelelő formátumú
                            </div> : null
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Jelszó</label>
                        <input
                            type="password"
                            className={`form-control ${this.state.passwordError ? "invalid" : ""}`}
                            id="password"
                            onChange={event => this.setState({
                                password: event.target.value.trim()
                            })}
                        />
                        {
                            this.state.passwordError ? <div className="invalid-feedback  d-block">
                                A jelszó nem megfelelő formátumú
                            </div> : null
                        }
                    </div>

                    <button type="submit" className="btn btn-block btn-primary">Bejelentkezés</button>
                </form>
            </div>
        );
    }
}

export default Login;