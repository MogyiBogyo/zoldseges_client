import React from "react";
import classes from './Product.module.css';

const product = (props) => {


    let sale = null;

    if(props.category.sale && props.isSale){
        sale = props.salePrice;
    }else if(props.category.sale){
        sale = props.category.salePrice;
    }

    let currentPrice = sale ? <p> Akciós ár: {sale} </p> :  <p> Ár : {props.price} </p>;

    return(
        <div className={classes.Product}>
            <p>ID: {props.id}</p>
            <p>Név: {props.name}</p>
            <p>Kategória : {props.category.name}</p>
            {currentPrice}
        </div>
    )
}


export default product;