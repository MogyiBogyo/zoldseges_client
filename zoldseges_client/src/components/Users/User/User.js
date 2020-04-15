import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'


const user = (props) => {
    /*return (
        <div>
            <p>ID: {props.id}</p>
            <p>Név: {props.familyName} {props.givenName}</p>
            <p>Felhasználónév: {props.userName}</p>
            <p>Email: {props.email}</p>
        </div>
    );*/

    let role = "";
    if(props.role === "ROLE_ADMIN"){
        role= "Admin";
    }else if(props.role === "ROLE_WORKER"){
        role= "Dolgozó";
    }



    return (
        <li className="list-group-item">
            <div className="row">
                
                <div className="col-12 col-md-3 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Név:
                    </span>
                    {props.familyName} {props.givenName}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                       Felhasználónév:
                    </span>
                    {props.userName}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Email cím:
                    </span>
                    {props.email}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Jogosultság:
                    </span>
                    {role}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Müvelet
                    </span>
                    <Link to={"/users/edit/" + props.id} className="btn btn-info">
                        <FontAwesomeIcon icon={faPen} />
                    </Link>
                    <button className="btn btn-danger" onClick={() => props.showDeleteQuestion()}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>

        </li>
    )

}

export default user;