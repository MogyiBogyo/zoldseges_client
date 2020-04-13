import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash} from '@fortawesome/free-solid-svg-icons'

const stock = (props) => {

    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        ID:
                    </span>
                    {props.id}
                </div>
                <div className="col-12 col-md-4 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Termék:
                    </span>
                    {props.product.name}
                </div>
                <div className="col-12 col-md-4 d-flex align-items-center justify-content-between ">
                    <span className="d-inline-block d-md-none">
                        Mennyiség
                    </span>
                    {props.quantity} Kg
                </div>

                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Müvelet
                    </span>
                    <Link to={"/stocks/edit/" + props.id} className="btn btn-info btn-sm">
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

export default stock;