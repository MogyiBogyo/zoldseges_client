import React from "react";


const product = (props) => {
    return(
        <div>
            <p>ID: {props.id}</p>
            <p>Név: {props.name}</p>
            <p>Kategória : {props.category}</p>
            <p>Ár : {props.price}</p>
            <p>Leárazott: {props.sale ? "igen" :"nem"} </p>
            <p>Akciós ár: {props.salePrice} </p>
        </div>
    )
}


export default product;