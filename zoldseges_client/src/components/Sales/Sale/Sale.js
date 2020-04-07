import React from "react";
import moment from 'moment';

const sale = (props) => {

    let date = moment(props.date).format("YYYY-MM-DD, hh:mm");

    return (
        <div>
            <p>ID: {props.id}</p>
            <p>Vásárló: {props.id}</p>
            <p>Termék: {props.product.name}</p>
            <p>Mennyiség (kg): {props.quantity}</p>
            <p>Ár: {props.price} Ft</p>
            <p>Dátum: {date}</p>
        </div>
    );
}

export default sale;