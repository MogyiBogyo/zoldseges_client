import React from "react";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const worktime = (props) => {

    let date = moment(props.date).format("YYYY-MM-DD");

    /*return (
        <div>
            <p>Id: {props.id}</p>
            <p>Dolgozó: ({props.user.id}) {props.user.familyname} {props.user.givenname}</p>
            <p>Dátum: {date}</p>
            <p>Műszak: {props.startHour}-{props.endHour} </p>
        </div>
    );*/

    return (
        <li className="list-group-item">
            <div className="row">

                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Dolgozó:
                    </span>
                    {props.user.familyname} {props.user.givenname}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between ">
                    <span className="d-inline-block d-md-none">
                        Dátum:
                    </span>
                    {date} 
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between ">
                    <span className="d-inline-block d-md-none">
                        Müszak kezdés:
                    </span>
                    {props.startHour}
                </div>
                <div className="col-12 col-md-3 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                       Műszak vége:
                    </span>
                    {props.endHour}
                </div>
                <div className="col-12 col-md-1 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Müvelet
                    </span>
                    <Link to={"/worktimes/edit/" + props.id} className="btn btn-info btn-sm">
                        <FontAwesomeIcon icon={faPen} />
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => props.showDeleteQuestion()}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>

        </li>
    );

}

export default worktime;