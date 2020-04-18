import React, { Component } from 'react';
import axios from '../../../axios-products';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { navigateToCustomPath } from "../../../App";

import SaleForm from './SaleForm';

class CreateSale extends Component {
    state = {
        quantity: "",
        product: null,
        date: "",
        buyer: "",
        price: "",
        serverError: false,
        successSave: false,
        stocks: []
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

    //csak akkor lehet eladni a terméket a mennyiséggel ha van ilyen termékből annyi a készletben
    // a sikeres eladás felkerül a tervezett rendelésekhez is

    handleSave = (data) => {
        var found = this.state.stocks.find(stock => parseInt(data.productId) === parseInt(stock.product.id));
        let productId = data.productId;
        let quantity = data.quantity;

        if(!!found){
            axios().post("sales/", { ...data })
                .then(() => {
                    axios().put("stocks/product/decrease/" + data.productId,
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
                            if (error.response.status === 409) {
                                this.setState({
                                    serverError: true,
                                    serverErrorText: "Ebből a termékből nincs készleten a megadott mennyiség"
                                })
                            } else {
                                this.setState({
                                    serverError: true,
                                    serverErrorText: "Ismeretlen szerver hiba "
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
                            serverErrorText: "Ismeretlen szerver hiva"
                        })
                    }
                });

        }else {
            this.setState({
                serverError: true,
                serverErrorText: "Ez a termék nincs készleten!"
            })
        }
            
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
                            <div className="card">
                                <div className="card-header">
                                    Új árubevétel felvétele
                                </div>
                                <div className="card-body">
                                    <SaleForm save={(data) => this.handleSave(data)} />
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
                    onConfirm={() => this.handleRedirectToSalesPage()}
                    onCancel={() => this.handleRedirectToSalesPage()}
                    btnSize="sm"
                >
                    Mentés!
                </SweetAlert>
            </div>
        );
    }
}

export default CreateSale;