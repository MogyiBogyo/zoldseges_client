import React from "react";
import moment from 'moment';

const income = (props) => {

    let date = moment(props.date).format("YYYY-MM-DD");
    
    return (
        <div>
            <p>ID: {props.id}</p>
            <p>Termék : {props.product.name}</p>            
            <p>Mennyiség: {props.quantity}</p>
            <p>Ár: {props.price}</p>
            <p>Eladó: {props.seller}</p>
            <p>Dátum: {date}</p>
        </div>
    );

}

export default income;