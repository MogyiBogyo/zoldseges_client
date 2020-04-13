import React, { Component } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import axios from '../../../axios-products';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { navigateToCustomPath } from "../../../App";

import StockForm from './StockForm';

class EditStock extends Component {

    state = {
        successSave: false,
        serverError: false,
        serverErrorText: "",
        stock: null
    }

    componentDidMount() {
        const id = this.props.computedMatch.params.id
        if (!!id) {
            axios.get("stocks/" + id)
                .then((response) => {
                    this.setState({
                        stock: response.data
                    })
                })
                .catch((error) => {
                    console.log("error ", error);
                    if (!!error.response && error.response.status === 404) {
                        this.setState({
                            stock: false,
                            serverErrorText: "Nem létezik ilyen készlet"
                        })
                    }
                });
        }
    }

    handleSave = (data) => {
        //console.log(data);
        //console.log(this.state.stock);
        axios.put("stocks/" + this.state.stock.id, { ...data })
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

    handleRedirectToStocksPage = () => {
        navigateToCustomPath("/stocks");
    }

    render() {
        return (
            <div>
                <div className={"container"}>
                    <div className="row my-3">
                        <div className="col-12 col-md-8 offset-md-2">
                            <Link to={"/stocks"} className={"btn btn-warning"} >
                                <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> Vissza
                            </Link>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-12 col-md-8 offset-md-2">
                            {
                                this.state.stock === null ?
                                    <div className="d-flex align-items-center justify-content-center flex-column pt-4">

                                        <ClipLoader
                                            size={150}
                                            loading={this.state.stock === null}
                                        />
                                        <h5 className="text-center mt-4">Készlet betöltése folyamatban</h5>
                                    </div>
                                    : null
                            }
                            {
                                !!this.state.stock ?
                                    <div className="card">
                                        <div className="card-header">
                                            Készlet szerkesztése
                                    </div>
                                        <div className="card-body">
                                            <StockForm
                                                save={(sendParams) => this.handleSave(sendParams)}
                                                stock={this.state.stock}
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
                    onConfirm={() => this.handleRedirectToStocksPage()}
                    onCancel={() => this.handleRedirectToStocksPage()}
                    btnSize="sm" >
                    Mentés!
                </SweetAlert>
            </div>
        );
    }



}

export default EditStock;