import React, { Component } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import axios from '../../../axios-products';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { navigateToCustomPath } from "../../../App";
import PlannedOrderForm from './PlannedOrderForm';


class EditPlannedOrder extends Component {

    state = {
        successSave: false,
        serverError: false,
        serverErrorText: "",
        plan: null
    }

    componentDidMount() {
        const id = this.props.computedMatch.params.id
        if (!!id) {
            axios().get("plans/" + id)
                .then((response) => {
                    this.setState({
                        plan: response.data
                    })
                })
                .catch((error) => {
                    console.log("error ", error);
                    if (!!error.response && error.response.status === 404) {
                        this.setState({
                            plan: false,
                            serverErrorText: "Nem létezik ilyen készlet"
                        })
                    }
                });
        }
    }


    handleSave = (data) => {
        axios().put("plans/" + this.state.plan.id, { ...data })
            .then(() => {
                this.setState({
                    successSave: true,
                })
            }).catch((error) => {
                console.log("error", error)
                if (error.response.status === 400) {
                    this.setState({
                        serverError: true,
                        serverErrorText: "Hibás adatok"
                    })
                } else {
                    this.setState({
                        serverError: true,
                        serverErrorText: "Ismeretlen szerver hiva"
                    })
                }

            });
    }


    handleRedirectToPalannedOrdersPage = () => {
        navigateToCustomPath("/plans");
    }


    render() {
        return (
            <div>
                <div className={"container"}>
                    <div className="row my-3">
                        <div className="col-12 col-md-8 offset-md-2">
                            <Link to={"/plans"} className={"btn btn-warning"} >
                                <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> Vissza
                            </Link>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-12 col-md-8 offset-md-2">
                            {
                                this.state.plan === null ?
                                    <div className="d-flex align-items-center justify-content-center flex-column pt-4">

                                        <ClipLoader
                                            size={150}
                                            loading={this.state.plan === null}
                                        />
                                        <h5 className="text-center mt-4">Tervezett rendelés betöltése folyamatban</h5>
                                    </div>
                                    : null
                            }
                            {
                                !!this.state.plan ?
                                    <div className="card">
                                        <div className="card-header">
                                            Készlet szerkesztése
                                    </div>
                                        <div className="card-body">
                                            <PlannedOrderForm
                                                save={(sendParams) => this.handleSave(sendParams)}
                                                plan={this.state.plan}
                                            />
                                        </div>
                                    </div>
                                    : null
                            }
                            {
                                this.state.stock === false ?
                                    <div className="alert alert-danger text-center">
                                        {this.state.serverErrorText}
                                    </div>
                                    : null
                            }
                        </div>
                    </div>

                </div>
                <SweetAlert
                    danger
                    show={this.state.serverError}
                    title="Hiba"
                    onConfirm={() => this.setState({
                        serverError: false
                    })}
                    onCancel={() => this.setState({
                        serverError: false
                    })}
                    btnSize="sm" >
                    {this.state.serverErrorText}
                </SweetAlert>
                <SweetAlert
                    success
                    show={this.state.successSave}
                    title="Sikeres"
                    onConfirm={() => this.handleRedirectToPalannedOrdersPage()}
                    onCancel={() => this.handleRedirectToPalannedOrdersPage()}
                    btnSize="sm" >
                    Mentés!
                </SweetAlert>
            </div>
        );
    }

}

export default EditPlannedOrder;