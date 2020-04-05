import React from "react";


const category = (props) => {
    return(
        <div>
            <p>ID: {props.id}</p>
            <p>Kategória : {props.name}</p>
            <p>Leárazott: {props.sale ? "igen" :"nem"} </p>
            <p>Akciós ár: {props.salePrice} </p>
        </div>
    )
}


export default category;