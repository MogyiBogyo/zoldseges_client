import React from "react";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const income = (props) => {

    let date = moment(props.date).format("YYYY-MM-DD");
    
    /*return (
        <div>
            <p>ID: {props.id}</p>
            <p>Termék : {props.product.name}</p>            
            <p>Mennyiség: {props.quantity}</p>
            <p>Ár: {props.price}</p>
            <p>Eladó: {props.seller}</p>
            <p>Dátum: {date}</p>
        </div>
    );*/

    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-12 col-md-1 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        ID:
                    </span>
                    {props.id}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Termék:
                    </span>
                    {props.product.name}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between justify-content-md-center">
                    <span className="d-inline-block d-md-none">
                        Mennyiség
                    </span>
                    {props.quantity} Kg
                </div>
                <div className="col-12 col-md-3 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Eladó:
                    </span>
                    {props.seller}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Dátum
                    </span>
                    {date}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Müvelet
                    </span>
                    <Link to={"/stocks/edit/" + props.id} className="btn btn-info">
                        <FontAwesomeIcon icon={faPen} />
                    </Link>
                    <button className="btn btn-danger" onClick={() => props.showDeleteQuestion()}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>

        </li>
    );

}

export default income;