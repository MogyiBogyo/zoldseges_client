import React from "react";

const stock = (props) => {

    return (
        <div>
            <p>ID: {props.id}</p>
            <p>Termék : {props.product.name}</p>
            <p>Mennyiség: {props.quantity}</p>
        </div>
    );
}

export default stock;