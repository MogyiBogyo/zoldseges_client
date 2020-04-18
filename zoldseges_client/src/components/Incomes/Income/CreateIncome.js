import React, { Component } from 'react';
import axios from '../../../axios-products';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { navigateToCustomPath } from "../../../App";
import IncomeForm from './IncomeForm';

class CreateIncome extends Component {
    state = {
        quantity: "",
        product: null,
        date: "",
        seller: "",
        price: "",
        stocks: [],
        serverError: false,
        successSave: false,
    }

    componentDidMount() {
        this.getStocks();
    }

    getStocks = () => {
        axios().get("stocks/").then(response => {
            const fetchedStocks = [];
            for (let key in response.data) {
                fetchedStocks.push({
                    ...response.data[key]
                });
            }
            this.setState({ stocks: fetchedStocks })
        }).catch((error) => {
            this.setState({
                serverError: true
            })

        });
    }


    handleSave = (data) => {
        var found = this.state.stocks.find(stock => parseInt(data.productId) === parseInt(stock.product.id));
        let productId = data.productId;
        let quantity = data.quantity;
        console.log(found);
        if (!!found) {
            axios().post("incomes/", { ...data })
                .then(() => {
                    axios().put("stocks/product/" + data.productId,
                        {
                            productId,
                            quantity
                        })
                        .then(() => {
                            this.setState({
                                successSave: true,
                            })
                        }).catch((error) => {
                            console.log("error", error)
                            if (error.response.status === 400) {
                                this.setState({
                                    serverError: true,
                                    serverErrorText: "Hibás adatok (products)"
                                })
                            } else {
                                this.setState({
                                    serverError: true,
                                    serverErrorText: "Ismeretlen szerver hiba (products)"
                                })
                            }

                        });
                }).catch((error) => {
                    console.log("error", error)
                    if (error.response.status === 400) {
                        this.setState({
                            serverError: true,
                            serverErrorText: "Helytelen adatok (incomes)"
                        })
                    } else {
                        this.setState({
                            serverError: true,
                            serverErrorText: "Ismeretlen szerver hiba (incomes)"
                        })
                    }
                });
        } else {
            axios().post("incomes/", { ...data })
                .then(() => {
                    axios().post("stocks/", {
                        productId,
                        quantity
                    })
                    .then(() => {
                        this.setState({
                            successSave: true,
                        })
                    }).catch((error) => {
                        console.log("error", error)
                        if (error.response.status === 400) {
                            this.setState({
                                serverError: true,
                                serverErrorText: "Helytelen készlet adatok"
                            })
                        } else {
                            this.setState({
                                serverError: true,
                                serverErrorText: "Ismeretlen szerver hiva"
                            })
                        }
                    });
                }).catch((error) => {
                    console.log("error", error)
                    if (error.response.status === 400) {
                        this.setState({
                            serverError: true,
                            serverErrorText: "Helytelen adatok"
                        })
                    } else {
                        this.setState({
                            serverError: true,
                            serverErrorText: "Ismeretlen szerver hiba (incomes)"
                        })
                    }
                });
        }

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
                            <div className="card">
                                <div className="card-header">
                                    Új árubevétel felvétele
                                </div>
                                <div className="card-body">
                                    <IncomeForm save={(data) => this.handleSave(data)} />
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
                    onConfirm={() => this.handleRedirectToIncomesPage()}
                    onCancel={() => this.handleRedirectToIncomesPage()}
                    btnSize="sm"
                >
                    Mentés!
                </SweetAlert>
            </div>
        );
    }
}

export default CreateIncome;