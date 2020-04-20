import React, { Component } from 'react';
import axios from '../../../axios-products';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";


class WorktimeForm extends Component {

    state = {
        user: null,
        date: "",
        users: [],
        startHour: "",
        endHour: "",


        //validation variables
        userError: false,
        dateError: false,
        startHourError: false,
        endHourError: false
    };


    componentDidMount() {
        if (!!this.props.worktime) {
            this.setState({
                user: this.props.worktime.user.id,
                startHour: this.props.worktime.startHour,
                endHour: this.props.worktime.endHour,
                date: moment(this.props.worktime.date).format("YYYY-MM-DD").toString(),
            })
        }
        this.getUsers();
    }


    getUsers = () => {
        axios().get("users/").then(response => {
            const fetchedUsers = [];
            for (let key in response.data) {
                fetchedUsers.push({
                    ...response.data[key]
                });
            }
            this.setState({ users: fetchedUsers, loading: false })
        }).catch(function (error) {
            this.setState({
                serverError: true
            })
        });
    }

    setStartDate = (date) => {
        this.setState({
            date: date
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // validate

        if (this.state.user === null) {
            this.setState({
                userError: true,
            });
            return
        } else {
            this.setState({
                userError: false,
            })
        }
        if (this.state.startHour === "") {
            this.setState({
                startHourError: true,
            });
            return
        } else {
            this.setState({
                startHourError: false,
            })
        }

        if (this.state.endHour === "") {
            this.setState({
                endHourError: true,
            });
            return
        } else {
            this.setState({
                endHourError: false,
            })
        }
        if (this.state.date === "") {
            this.setState({
                dateError: true,
            });
            return
        } else {
            this.setState({
                dateError: false,
            })
        }

        //save
        const sendParams = {
            userId: this.state.user,
            date: moment(this.state.date).format("YYYY-MM-DD"),
            startHour: this.state.startHour,
            endHour: this.state.endHour
        };
        //console.log(sendParams);
        this.props.save(sendParams)
    }


    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label>Dolgozó</label>
                    <select
                        className={`form-control ${this.state.userError ? "invalid" : ""} `}
                        onChange={(e) => this.setState({
                            user: e.target.value
                        })} >
                        <option value=""  >Válasszon dolgozót</option>
                        {this.state.users.map(user => (
                            <option
                                value={user.id}
                                key={user.id}
                                selected={!!this.state.user && this.state.user === user.id ? "selected" : ""}
                            >{user.familyname} {user.givenname}</option>
                        ))}
                    </select>
                </div>
                {
                    this.state.userError ?
                        <div className="invalid-feedback d-block">
                            Dolgozó választása kötelező!</div>
                        : null
                }


                <div className="form-group">
                    <label htmlFor="startHour">Műszak kezdés</label>
                    <select
                        className={`form-control ${this.state.startHourError ? "invalid" : ""} `}
                        onChange={(e) => this.setState({
                            startHour: e.target.value
                        })}>
                        <option value={""}
                            key={0}
                            selected="selected"
                        >Válasszon kezdést</option>
                        <option value={"08:00"}
                            key={1}
                            selected={!!this.state.startHour && this.state.startHour === "08:00" ? "selected:" : ""}
                        >08:00</option>
                        <option value={"08:30"}
                            key={2}
                            selected={!!this.state.startHour && this.state.startHour === "08:30" ? "selected:" : ""}
                        >08:30</option>
                        <option value={"09:00"}
                            key={3}
                            selected={!!this.state.startHour && this.state.startHour === "09:00" ? "selected:" : ""}
                        >09:00</option>
                        <option value={"09:30"}
                            key={4}
                            selected={!!this.state.startHour && this.state.startHour === "09:30" ? "selected:" : ""}
                        >09:30</option>
                        <option value={"09:00"}
                            key={3}
                            selected={!!this.state.startHour && this.state.startHour === "10:00" ? "selected:" : ""}
                        >10:00</option>
                        <option value={"09:00"}
                            key={3}
                            selected={!!this.state.startHour && this.state.startHour === "10:30" ? "selected:" : ""}
                        >10:30</option>
                        <option value={"09:00"}
                            key={3}
                            selected={!!this.state.startHour && this.state.startHour === "11:00" ? "selected:" : ""}
                        >11:00</option>

                    </select>
                </div>
                {
                    this.state.startHourError ? <div className="invalid-feedback d-block mb-3">
                        Műszakkezdést kötelező megadni!
                            </div> : null
                }

                <div className="form-group">
                    <label htmlFor="endHour">Műszak vége</label>
                    <select
                        className={`form-control ${this.state.endHourError ? "invalid" : ""} `}
                        onChange={(e) => this.setState({
                            endHour: e.target.value
                        })}>
                        <option value={""}
                            key={0}
                            selected="selected"
                        >Válassza ki a műszak befejezésének időpontját</option>
                        <option value={"12:00"}
                            key={1}
                            selected={!!this.state.endHour && this.state.endHour === "12:00" ? "selected:" : ""}
                        >12:00</option>
                        <option value={"13:00"}
                            key={2}
                            selected={!!this.state.endHour && this.state.endHour === "13:00" ? "selected:" : ""}
                        >13:00</option>
                        <option value={"14:00"}
                            key={3}
                            selected={!!this.state.endHour && this.state.endHour === "14:00" ? "selected:" : ""}
                        >14:00</option>
                        <option value={"15:00"}
                            key={4}
                            selected={!!this.state.endHour && this.state.endHour === "15:00" ? "selected:" : ""}
                        >15:00</option>
                        <option value={"16:00"}
                            key={4}
                            selected={!!this.state.endHour && this.state.endHour === "16:00" ? "selected:" : ""}
                        >16:00</option>
                        <option value={"17:00"}
                            key={4}
                            selected={!!this.state.endHour && this.state.endHour === "17:00" ? "selected:" : ""}
                        >17:00</option>

                    </select>
                </div>
                {
                    this.state.endHourError ? <div className="invalid-feedback d-block mb-3">
                        A műszak végét kötelező megadni!
                            </div> : null
                }

                <div className="form-group">
                    <div><label htmlFor="date">Dátum</label></div>
                    <DatePicker
                        showPopperArrow={false}
                        selected=""
                        onChange={(date) => this.setStartDate(date)}
                        value={this.state.date}
                        dateFormat={"yyyy-MMM-dd"}
                    />
                </div>
                {
                    this.state.dateError ? <div className="invalid-feedback d-block mb-3">
                        Dátum megadása kötelező megadni!
                            </div> : null
                }

                <button type="submit" className="btn btn-primary">Mentés</button>
            </form >
        );
    }

}



export default WorktimeForm;