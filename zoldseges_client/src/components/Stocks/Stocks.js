import React, { Component } from 'react';
import axios from '../../axios-products';
import Stock from './Stock/Stock';

import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

class Stocks extends Component {
    state = {
        stocks: [],
        loading: true,
        selectedStock: null,
        serverError: false,
        deleteQuestion: false,
        showDeleteQuestion: false,
        successDelete: false,
        deleteErrorText: ""
    }


    componentDidMount() {
        this.getStocks();
    }

    getStocks = () => {
        axios.get("stocks/").then(response => {
            const fetchedStocks = [];
            for (let key in response.data) {
                fetchedStocks.push({
                    ...response.data[key]
                });
            }
            this.setState({ stocks: fetchedStocks, loading: false })
        }).catch(function (error) {
            this.setState({
                serverError: true
            })

        });
    }

    handleDelete = () => {
        if (this.state.selectedStock) {
            axios.delete("stocks/" + this.state.selectedStock.id)
                .then(() => {
                    this.getStocks();
                    this.setState({
                        showDeleteQuestion: false,
                        selectedStock: null,
                        successDelete: true,

                    })
                }).catch((error) => {
                    if (error.response.status === 400) {
                        this.setState({
                            showDeleteQuestion: false,
                            selectedStock: null,
                            serverError: true,
                            deleteErrorText: "Nem lehet törölni készletet mert hivatkoznak rá!"
                        })
                    } else {
                        this.setState({
                            showDeleteQuestion: false,
                            selectedStock: null,
                            serverError: true,
                            deleteErrorText: "Ismeretlen szerverhiba!"
                        })
                    }
                });
        }
    }



    render() {
        return (
            <>
                <div className={"container"}>
                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2">
                            <div className="row my-3">
                                <div className="col-12 ">
                                    <Link to={"/stocks/new"} className={"btn btn-primary"} >
                                        + Új készlet felvétele
                            </Link>
                                </div>
                            </div>
                            <ul className="list-group">
                                <li className="list-group-item d-none d-md-block">
                                    <div className="row">
                                        <div className="col-12 col-md-2">
                                            <b>
                                                ID:
                                    </b>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <b>
                                                Termék
                                    </b>
                                        </div>
                                        <div className="col-12 col-md-4 ">
                                            <b>
                                                Mennyiség
                                    </b>
                                        </div>
                                        <div className="col-12 col-md-2 d-flex justify-content-center ">
                                            <b>
                                                Művelet
                                    </b>
                                        </div>
                                    </div>
                                </li>
                                {this.state.stocks.map(stock => (
                                    <Stock
                                        key={stock.id}
                                        id={stock.id}
                                        product={stock.product}
                                        quantity={stock.quantity}
                                        showDeleteQuestion={() => this.setState({
                                            showDeleteQuestion: true,
                                            selectedStock: stock
                                        })}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div >
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
                    {this.state.deleteErrorText}
                </SweetAlert>
                <SweetAlert
                    success
                    show={this.state.successDelete}
                    title="Sikeres"
                    onConfirm={() => this.setState({
                        successDelete: false
                    })}
                    onCancel={() => this.setState({
                        successDelete: false
                    })}
                    btnSize="sm" >
                    Törlés!
                </SweetAlert>
                <SweetAlert
                    danger
                    show={this.state.showDeleteQuestion}
                    showCancel
                    title="Törlés megerősítés"
                    confirmBtnText="Igen"
                    cancelBtnText="Mégse"
                    onConfirm={() => this.handleDelete()}
                    onCancel={() => this.setState({
                        showDeleteQuestion: false,
                        selectedStock: null
                    })}
                    btnSize="sm" >
                    {
                        !!this.state.selectedStock ? <div>
                            Biztos törli a készletet?
                                </div> : null
                    }
                </SweetAlert>
            </>
        );
    }
}

export default Stocks;