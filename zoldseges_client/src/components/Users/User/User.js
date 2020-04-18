import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faEnvelope, faUserShield, faUserAlt } from '@fortawesome/free-solid-svg-icons'


const user = (props) => {


    let role = "";
    if (props.role === "ROLE_ADMIN") {
        role = "Admin";
    } else if (props.role === "ROLE_WORKER") {
        role = "Dolgozó";
    }



    return (
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 my-2">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-between my-2">
                            <span className="d-inline-block">
                                Név:
                            </span>
                            <b>
                            {props.familyName} {props.givenName}
                            </b>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">                
                        <div className="col-12 d-flex align-items-center justify-content-between my-2">
                            <span className="d-inline-block">
                            <FontAwesomeIcon icon={faUserAlt} className="mr-2" />
                                Felhasználónév:
                    </span>
                            <b>
                            {props.userName}
                            </b>
                        </div>
                        <div className="col-12 d-flex align-items-center justify-content-between my-2">
                            <span className="d-inline-block">
                                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                Email cím:
                    </span>
                            <b>
                            {props.email}
                            </b>
                    
                        </div>
                        <div className="col-12 d-flex align-items-center justify-content-between my-2">
                            <span className="d-inline-block">
                            <FontAwesomeIcon icon={faUserShield} className="mr-2" />
                                Jogosultság:
                    </span>
                            <b>
                            {role}
                            </b>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-between my-2">
                            <Link to={"/users/edit/" + props.id} className="btn btn-block btn-info btn-sm">
                                <FontAwesomeIcon icon={faPen} />
                            </Link>

                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-between my-2">
                            <button className="btn btn-sm btn-block btn-danger" onClick={() => props.showDeleteQuestion()}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default user;