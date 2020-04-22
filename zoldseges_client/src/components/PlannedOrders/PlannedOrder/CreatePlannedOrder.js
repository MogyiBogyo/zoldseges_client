import React, { Component } from 'react';
import axios from '../../../axios-products';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { navigateToCustomPath } from "../../../App";

import PlannedOrderForm from './PlannedOrderForm';

class CreatePlannedOrder extends Component {

    state = {
        quantity: "",
        product: null,
        serverError: false,
        successSave: false,
        plannedorders: []
    }

    componentDidMount() {
        this.getPlannerOrders();
    }


    getPlannerOrders = () => {
        axios().get("plans/")
            .then(response => {
                const fetchedPlans = [];
                for (let key in response.data) {
                    fetchedPlans.push({
                        ...response.data[key]
                    });
                }
                this.setState({ plannedorders: fetchedPlans, loading: false })
            }).catch(function (error) {
                this.setState({
                    serverError: true
                })
            });
    }



    handleSave = (data) => {
        var found = this.state.plannedorders.find(plannedorder => parseInt(data.productId) === parseInt(plannedorder.product.id));


        if (!!found) {
            axios().put("plans/product/" + data.productId, { ...data })
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
                            serverErrorText: "Ismeretlen szerver hiba"
                        })
                    }

                });
        } else {
            axios().post("plans/", { ...data })
                .then(() => {
                    this.setState({
                        successSave: true,
                    })
                }).catch((error) => {
                    console.log("error", error)
                    if (error.response.status === 400) {
                        this.setState({
                            serverError: true,
                            serverErrorText: "Helytelen rendelési adatok"
                        })
                    } else {
                        this.setState({
                            serverError: true,
                            serverErrorText: "Ismeretlen szerver hiva"
                        })
                    }
                });
        }
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
                            <div className="card">
                                <div className="card-header">
                                    Új tervezett rendelés felvétele
                                </div>
                                <div className="card-body">
                                    <PlannedOrderForm save={(data) => this.handleSave(data)} />
                                </div>
                            </div>
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
                    btnSize="sm"
                >
                    {this.state.serverErrorText}
                </SweetAlert>
                <SweetAlert
                    success
                    show={this.state.successSave}
                    title="Sikeres"
                    onConfirm={() => this.handleRedirectToPalannedOrdersPage()}
                    onCancel={() => this.handleRedirectToPalannedOrdersPage()}
                    btnSize="sm"
                >
                    Mentés!
                </SweetAlert>



            </div>
        );
    }

}

export default CreatePlannedOrder;