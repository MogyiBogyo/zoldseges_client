import React from "react";
import moment from 'moment';


const worktime = (props) => {

    let date = moment(props.date).format("YYYY-MM-DD");

    return (
        <div>
            <p>Id: {props.id}</p>
            <p>Dolgozó: ({props.user.id}) {props.user.familyname} {props.user.givenname}</p>
            <p>Dátum: {date}</p>
            <p>Műszak: {props.startHour}-{props.endHour} </p>
        </div>
    );

}

export default worktime;