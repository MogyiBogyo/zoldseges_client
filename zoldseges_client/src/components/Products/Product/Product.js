import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faCheck, faBan } from '@fortawesome/free-solid-svg-icons'

const product = (props) => {


    let isSale = props.isSale ? <FontAwesomeIcon icon={faCheck} className={"text-success"} /> : <FontAwesomeIcon icon={faBan} className={"text-danger"} />;
    let salePrice = props.isSale ? (isSale && props.salePrice !== 0 ? props.salePrice + " FT / Kg" : null) : null;

    /*if(props.category.sale && props.isSale){
        sale = props.salePrice;
    }else if(props.category.sale){
        sale = props.category.salePrice;
    }*/

    //let currentPrice = sale ? <p> Akciós ár: {sale} </p> :  <p> Ár : {props.price} </p>;

    return (
        <li className="list-group-item">
            <div className="row">
            
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Név:
                </span>
                    {props.name}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between justify-content-md-center">
                    <span className="d-inline-block d-md-none">
                        Ár
                </span>
                    {props.price} / Kg
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between justify-content-md-center">
                    <span className="d-inline-block d-md-none">
                        Akciós
                </span>
                    {isSale}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between justify-content-md-center">
                    <span className="d-inline-block d-md-none">
                        Akciós ár
                </span>
                    {salePrice}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Kategória
                </span>
                    {props.category.name}
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-between">
                    <span className="d-inline-block d-md-none">
                        Müvelet
                </span>
                    <Link to={"/products/edit/" + props.id} className="btn btn-info btn-sm">
                        <FontAwesomeIcon icon={faPen} />
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => props.showDeleteQuestion()}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>

        </li>
    )
}


export default product;