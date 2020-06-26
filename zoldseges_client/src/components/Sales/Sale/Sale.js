import React from "react";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const sale = (props) => {

    let date = moment(props.date).format("YYYY-MM-DD");
    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Termék:
                    </span>
                    {props.product.name}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between ">
                    <span className="d-inline-block d-md-none">
                        Mennyiség
                    </span>
                    {props.quantity} Kg
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between ">
                    <span className="d-inline-block d-md-none">
                        Ár
                    </span>
                    {props.price} Ft
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Vevő:
                    </span>
                    {props.buyer}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Dátum:
                    </span>
                    {date}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between my-2">
                    <span className="d-inline-block d-md-none">
                        Müvelet
                    </span>
                    <Link to={"/sales/edit/" + props.id} className="btn btn-info btn-sm">
                        <FontAwesomeIcon icon={faPen} />
                    </Link>
                    <button className="btn btn-danger btn-sm"  onClick={() => props.showDeleteQuestion()}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>

        </li>
    );

}

export default sale;