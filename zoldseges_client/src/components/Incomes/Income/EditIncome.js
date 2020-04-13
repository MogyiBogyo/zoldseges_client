import React, { Component } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import axios from '../../../axios-products';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { navigateToCustomPath } from "../../../App";

import IncomeForm from './IncomeForm';


class EditIncome extends Component {

    state = {
        successSave: false,
        serverError: false,
        serverErrorText: "",
        income: null
    }


    componentDidMount() {
        const id = this.props.computedMatch.params.id
        if (!!id) {
            axios.get("incomes/" + id)
                .then((response) => {
                    console.log(response.data);
                    this.setState({
                        income: response.data
                    })
                })
                .catch((error) => {
                    console.log("error ", error);
                    if (!!error.response && error.response.status === 404) {
                        this.setState({
                            income: false,
                            serverErrorText: "Nem létezik ilyen árubevétel"
                        })
                    }
                });
        }
    }


    handleSave = (data) => {
        //console.log(this.state.stock);
        axios.put("incomes/" + this.state.income.id, { ...data })
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

    handleRedirectToIncomesPage = () => {
        navigateToCustomPath("/incomes");
    }


    render() {
        return (
            <div>
                <div className={"container"}>
                    <div className="row my-3">
                        <div className="col-12 col-md-8 offset-md-2">
                            <Link to={"/incomes"} className={"btn btn-warning"} >
                                <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> Vissza
                            </Link>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-12 col-md-8 offset-md-2">
                            {
                                this.state.income === null ?
                                    <div className="d-flex align-items-center justify-content-center flex-column pt-4">

                                        <ClipLoader
                                            size={150}
                                            loading={this.state.income === null}
                                        />
                                        <h5 className="text-center mt-4">Árubevétel betöltése folyamatban</h5>
                                    </div>
                                    : null
                            }
                            {
                                !!this.state.income ?
                                    <div className="card">
                                        <div className="card-header">
                                            Árubevétel szerkesztése
                                    </div>
                                        <div className="card-body">
                                            <IncomeForm
                                                save={(sendParams) => this.handleSave(sendParams)}
                                                income={this.state.income}
                                            />
                                        </div>
                                    </div>
                                    : null
                            }
                            {
                                this.state.income === false ?
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
                    onConfirm={() => this.handleRedirectToIncomesPage()}
                    onCancel={() => this.handleRedirectToIncomesPage()}
                    btnSize="sm" >
                    Mentés!
                </SweetAlert>
            </div>
        );
    }
}

export default EditIncome;