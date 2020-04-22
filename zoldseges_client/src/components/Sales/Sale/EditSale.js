import React, { Component } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import axios from '../../../axios-products';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { navigateToCustomPath } from "../../../App";

import SaleForm from './SaleForm';

class EditSale extends Component {

    state = {
        successSave: false,
        serverError: false,
        serverErrorText: "",
        sale: null
    }



    componentDidMount() {
        const id = this.props.computedMatch.params.id
        if (!!id) {
            axios().get("sales/" + id)
                .then((response) => {
                    this.setState({
                        sale: response.data
                    })
                })
                .catch((error) => {
                    if (!!error.response && error.response.status === 404) {
                        this.setState({
                            sale: false,
                            serverErrorText: "Nem létezik ilyen árubevétel"
                        })
                    }
                });
        }
    }


    handleSave = (data) => {
        axios().put("sales/" + this.state.sale.id, { ...data })
            .then(() => {
                this.setState({
                    successSave: true,
                })
            }).catch((error) => {
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

    handleRedirectToSalesPage = () => {
        navigateToCustomPath("/sales");
    }

    render() {
        return (
            <div>
                <div className={"container"}>
                    <div className="row my-3">
                        <div className="col-12 col-md-8 offset-md-2">
                            <Link to={"/sales"} className={"btn btn-warning"} >
                                <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> Vissza
                            </Link>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-12 col-md-8 offset-md-2">
                            {
                                this.state.sale === null ?
                                    <div className="d-flex align-items-center justify-content-center flex-column pt-4">

                                        <ClipLoader
                                            size={150}
                                            loading={this.state.sale === null}
                                        />
                                        <h5 className="text-center mt-4">Eladás adatainak betöltése folyamatban</h5>
                                    </div>
                                    : null
                            }
                            {
                                !!this.state.sale ?
                                    <div className="card">
                                        <div className="card-header">
                                            Eladás adatainak szerkesztése
                                    </div>
                                        <div className="card-body">
                                            <SaleForm
                                                save={(sendParams) => this.handleSave(sendParams)}
                                                sale={this.state.sale}
                                            />
                                        </div>
                                    </div>
                                    : null
                            }
                            {
                                this.state.sale === false ?
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
                    onConfirm={() => this.handleRedirectToSalesPage()}
                    onCancel={() => this.handleRedirectToSalesPage()}
                    btnSize="sm" >
                    Mentés!
                </SweetAlert>
            </div>
        );
    }


}

export default EditSale;