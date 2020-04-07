import React from "react";

const user = (props) => {
    return (
        <div>
            <p>ID: {props.id}</p>
            <p>Név: {props.familyName} {props.givenName}</p>
            <p>Felhasználónév: {props.userName}</p>
            <p>Email: {props.email}</p>
        </div>
    );
}

export default user;