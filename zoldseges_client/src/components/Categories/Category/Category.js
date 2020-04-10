import React from "react";
import classes from './Category.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faCheck, faBan } from '@fortawesome/free-solid-svg-icons'


const category = (props) => {

    //console.log(props.isSale);
    let isSale = props.isSale ? <FontAwesomeIcon icon={faCheck} className={"text-success"} /> : <FontAwesomeIcon icon={faBan} className={"text-danger"} />;
    let salePrice = isSale ? props.salePrice+" FT"  : null;

    return(
        <li className="list-group-item">
            <div className="row">
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                    ID:
                    </span>
                    {props.id}
                </div>
                <div className="col-12 col-md-3 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                    Név:
                    </span>
                    {props.name}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                    Akciós
                    </span>
                    {isSale}
                </div>
                <div className="col-12 col-md-3 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                    Akciós ár
                    </span>
                    {salePrice}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                    Müvelet
                    </span>
                    <Link to={"/categories/edit/"+props.id} className="btn btn-info">
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


export default category;