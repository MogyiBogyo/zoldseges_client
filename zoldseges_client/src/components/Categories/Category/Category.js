import React from "react";
import classes from './Category.module.css';




const category = (props) => {

    console.log(props.isSale);
    let isSale = props.isSale ? <p>Leárazott</p> : null;
    let salePrice = isSale ? <p>Akciós ár: {props.salePrice} </p> : null;

    return(
        <div className={classes.Category}>
            <p>ID: {props.id}</p>
            <p>Kategória : {props.name}</p>
            {isSale}
            {salePrice}
        </div>
    )
}


export default category;