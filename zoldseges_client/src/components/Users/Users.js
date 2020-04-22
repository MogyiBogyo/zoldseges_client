import React, { Component } from 'react';
import axios from '../../axios-products';
import User from './User/User';


import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

class Users extends Component {
    state = {
        users: [],
        filteredUsers: [],
        loading: true,
        serverError: false,
        deleteQuestion: false,
        showDeleteQuestion: false,
        selectedUser: null,
        successDelete: false,
        deleteErrorText: "",
        loggedUserRole: null,
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        axios().get("users/").then(response => {
            const fetchedUsers = [];
            for (let key in response.data) {
                fetchedUsers.push({
                    ...response.data[key]
                });
            }
            this.setState({ 
                users: fetchedUsers, 
                filteredUsers: [...fetchedUsers],
                loading: false })
        }).catch(function (error) {
            this.setState({
                serverError: true
            })
        });
    }


    handleDelete = () => {

        if (this.state.selectedUser) {
            if (localStorage.getItem("loggedUserName") === this.state.selectedUser.username) {
                this.setState({
                    deleteErrorText: "Bejelentkezett profilt nem lehet törölni!",
                    showDeleteQuestion: false,
                    selectedUser: null,
                    serverError: true,
                })
                return
            }

            if (this.state.selectedUser.role === "ROLE_ADMIN") {
                this.setState({
                    deleteErrorText: "Nem lehet admin jogosultságú felhasználót törölni!",
                    showDeleteQuestion: false,
                    selectedUser: null,
                    serverError: true,
                })
                return
            }

            axios().delete("users/" + this.state.selectedUser.id)
                .then(() => {
                    this.getUsers();
                    this.setState({
                        showDeleteQuestion: false,
                        selectedUser: null,
                        successDelete: true,

                    })
                }).catch((error) => {
                    if (error.response.status === 400) {
                        this.setState({
                            showDeleteQuestion: false,
                            selectedUser: null,
                            serverError: true,
                            deleteErrorText: "Nem lehet törölni a felhasználót mert szerepel a beosztásban!"
                        })
                    } else {
                        this.setState({
                            showDeleteQuestion: false,
                            selectedUser: null,
                            serverError: true,
                            deleteErrorText: "Ismeretlen szerverhiba!"
                        })
                    }
                });



        }
    }

    render() {
        return (
            <>
                <div className={"mx-3"}>
                    <div className="row my-3">
                        <div className="col-12">
                            <Link to={"/users/new"} className={"btn btn-primary"} >
                                + Új felhasználó felvétele
                            </Link>
                        </div>
                    </div>
                    <div className={"row"}>                    
                        {this.state.users.map(user => (
                                <User
                                    key={user.id}
                                    id={user.id}
                                    userName={user.username}
                                    email={user.email}
                                    familyName={user.familyname}
                                    givenName={user.givenname}
                                    role={user.role}
                                    showDeleteQuestion={() => this.setState({
                                        showDeleteQuestion: true,
                                        selectedUser: user
                                    })}
                                />
                            ))}
                    </div>
                  
                </div>
                <SweetAlert
                    danger
                    show={this.state.serverError}
                    title="Hiba"
                    onConfirm={() => this.setState({
                        serverError: false
                    })}
                    onCancel={() => this.setState({
                        serverError: false
                    })}
                    btnSize="sm" >
                    {this.state.deleteErrorText}
                </SweetAlert>
                <SweetAlert
                    success
                    show={this.state.successDelete}
                    title="Sikeres"
                    onConfirm={() => this.setState({
                        successDelete: false
                    })}
                    onCancel={() => this.setState({
                        successDelete: false
                    })}
                    btnSize="sm" >
                    Törlés!
                            </SweetAlert>
                <SweetAlert
                    danger
                    show={this.state.showDeleteQuestion}
                    showCancel
                    title="Törlés megerősítés"
                    confirmBtnText="Igen"
                    cancelBtnText="Mégse"
                    onConfirm={() => this.handleDelete()}
                    onCancel={() => this.setState({
                        showDeleteQuestion: false,
                        selectedUser: null
                    })}
                    btnSize="sm" >
                    {
                        !!this.state.selectedUser ? <div>
                            Biztos törli <b>
                                {this.state.selectedUser.familyname} {this.state.selectedUser.givenname}
                            </b> felhasználót?
                                </div> : null
                    }
                </SweetAlert>
            </>
        );
    }

}


export default Users;