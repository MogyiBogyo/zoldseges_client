import React, { Component } from 'react';
import axios from '../../../axios-products';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { navigateToCustomPath } from "../../../App";
import StockForm from './StockForm';


class CreateStock extends Component {
    state = {
        quantity: "",
        product: null,
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


    handleSave = (data) => {
        var found = this.state.stocks.find(stock => parseInt(data.productId) === parseInt(stock.product.id))

        if (!!found) {
            axios().put("stocks/product/" + data.productId, { ...data })
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
                            serverErrorText: "Ismeretlen szerver hiba (products)"
                        })
                    }

                });
        } else {
            axios().post("stocks/", { ...data })
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
        }
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
                            <div className="card">
                                <div className="card-header">
                                    Új készlet felvétele
                                </div>
                                <div className="card-body">
                                    <StockForm save={(data) => this.handleSave(data)} />
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
                    onConfirm={() => this.handleRedirectToStocksPage()}
                    onCancel={() => this.handleRedirectToStocksPage()}
                    btnSize="sm"
                >
                    Mentés!
                </SweetAlert>



            </div>
        );
    }


}

export default CreateStock;