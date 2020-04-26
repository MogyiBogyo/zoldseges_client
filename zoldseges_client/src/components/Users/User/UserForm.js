import React, { Component } from "react"

class UserForm extends Component {
    state = {
        familyname: "",
        givenname: "",
        username: "",
        email: "",
        role: "",
        password: "",
        //validation
        usernameError: false,
        emailError: false,
        roleError: false,
        familynameError: false,
        givennameError: false,
        passwordError: false,
        saveError: false,
        roles: ["ROLE_ADMIN", "ROLE_WORKER"]
    };

    componentDidMount() {
        if (!!this.props.user) {
            //console.log(this.props.stock);
            this.setState({
                username: this.props.user.username,
                familyname: this.props.user.familyname,
                givenname: this.props.user.givenname,
                email: this.props.user.email,
                role: this.props.user.role,
                password: this.props.user.password
            })
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();
        // validate
        if (this.state.username === "") {
            this.setState({
                usernameError: true
            });
            return
        } else {
            this.setState({
                usernameError: false
            })
        }
        if (this.state.familyname === "") {
            this.setState({
                familynameError: true,
            });
            return
        } else {
            this.setState({
                familynameError: false,
            })
        }
        if (this.state.givenname === "") {
            this.setState({
                givennameError: true,
            });
            return
        } else {
            this.setState({
                givennameError: false,
            })
        }
        if (this.state.email === "") {
            this.setState({
                emailError: true,
            });
            return
        } else {
            this.setState({
                emailError: false,
            })
        }
        if (this.state.password === "") {
            this.setState({
                passwordError: true,
            });
            return
        } else {
            this.setState({
                sendParams: false,
            })
        }
        //save
        const sendParams = {

            familyname: this.state.familyname,
            givenname: this.state.givenname,
            username: this.state.username,
            email: this.state.email,
            role: this.state.role,
            password: this.state.password,
        };
        //console.log(sendParams);
        //console.log(sendParams.role);
        this.props.save(sendParams)
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="username">Felhasználónév</label>
                    <input type="text"
                        className={`form-control ${this.state.usernameError ? "invalid" : ""}`}
                        id="username"
                        onChange={(e) => this.setState({
                            username: e.target.value
                        })}
                        value={this.state.username}
                    />
                    {
                        this.state.usernameError ? <div className="invalid-feedback  d-block">
                            Felhasználónév megadása kötelező!
                            </div> : <small className="form-text text-muted">A felhasználónév nem lehet azonos a rendszerben megtalálhatókkal</small>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="familyname">Vezetéknév</label>
                    <input type="text"
                        className={`form-control ${this.state.familynameError ? "invalid" : ""}`}
                        id="familyname"
                        onChange={(e) => this.setState({
                            familyname: e.target.value
                        })}
                        value={this.state.familyname}
                    />
                    {
                        this.state.familynameError ? <div className="invalid-feedback  d-block">
                            Vezetéknév megadása kötelező!
                            </div> : null
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="givenname">Keresztnév</label>
                    <input type="text"
                        className={`form-control ${this.state.givennameError ? "invalid" : ""}`}
                        id="givenname"
                        onChange={(e) => this.setState({
                            givenname: e.target.value
                        })}
                        value={this.state.givenname}
                    />
                    {
                        this.state.givennameError ? <div className="invalid-feedback  d-block">
                            Keresztnév megadása kötelező!
                            </div> : null
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text"
                        className={`form-control ${this.state.emailError ? "invalid" : ""}`}
                        id="email"
                        onChange={(e) => this.setState({
                            email: e.target.value
                        })}
                        value={this.state.email}
                    />
                    {
                        this.state.emailError ? <div className="invalid-feedback  d-block">
                            Email megadása kötelező!
                            </div> : null
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="password">Jelszó</label>
                    <input type="password"
                        className={`form-control ${this.state.passwordError ? "invalid" : ""}`}
                        id="password"
                        onChange={(e) => this.setState({
                            password: e.target.value
                        })}
                        value={this.state.password}
                    />
                    {
                        this.state.passwordError ? <div className="invalid-feedback  d-block">
                            Jelszó megadása kötelező!
                            </div> : null
                    }
                </div>
                <div className="form-group">
                    <label >Jogosultság</label>
                    <select
                        className={`form-control ${this.state.roleError ? "invalid" : ""} `}
                        onChange={(e) => this.setState({
                            role: e.target.value
                        })}>
                        <option value="" selected disabled hidden >Válasszon jogosultságot</option>
                        <option value={"ROLE_ADMIN"}
                            key={1}
                            selected={!!this.state.role && this.state.role === "ROLE_ADMIN" ? "selected:" : ""}
                        >Admin</option>
                        <option value={"ROLE_WORKER"}
                            key={2}
                            selected={!!this.state.role && this.state.role === "ROLE_WORKER" ? "selected:" : ""}
                        >Dolgozó</option>

                    </select>
                </div>
                {
                    this.state.roleError ? <div className="invalid-feedback  d-block">
                        Jogosultség választása kötelező!
                            </div> : null
                }
                <button type="submit" className="btn btn-primary mt-3">Mentés</button>
            </form>
        );
    }
}
export default UserForm;