import React from "react";

const plannedorder = (props) => {
    return (
        <div>
            <p>ID: {props.id}</p>
            <p>Termék: {props.product.name}</p>
            <p>Mennyiség (kg): {props.quantity}</p>
        </div>
    );
}

export default plannedorder;