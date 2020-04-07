import React, { Component } from 'react';
import axios from '../../axios-products';
import User from './User/User';

class Users extends Component {
    state = {
        users: [],
        loading: true
    }

    componentDidMount() {
        axios.get("users/", {
            withCredentials: true,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }

        }).then(response => {
            console.log(response);
            const fetchedUsers = [];
            for (let key in response.data) {
                fetchedUsers.push({
                    ...response.data[key]
                });
            }
            this.setState({ users: fetchedUsers, loading: false })
        }).catch(function (error) {
            console.log('Error on stocks');
        });
    }

    render() {
        return (
            <div>
                {this.state.users.map(user => (
                    <User
                        key={user.id}
                        id={user.id}
                        userName={user.username}
                        email={user.email}
                        familyName={user.familyname}
                        givenName={user.givenname}
                    />
                ))}
            </div>
        );
    }

}


export default Users;