import React, { Component } from 'react';
import axios from '../../axios-products';
import Stock from './Stock/Stock';

import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import "./Stocks.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Bar, Pie } from 'react-chartjs-2';

class Stocks extends Component {
    state = {
        stocks: [],
        chartStocks: [],
        selectedStock: null,
        serverError: false,
        deleteQuestion: false,
        showDeleteQuestion: false,
        successDelete: false,
        deleteErrorText: "",
        showChart: true,
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
            this.setState({
                stocks: [...fetchedStocks],
                chartStocks: [...fetchedStocks]
            })
        }).catch((error) => {
            this.setState({
                serverError: true
            })

        });
    }

    handleDelete = () => {
        if (this.state.selectedStock) {
            axios().delete("stocks/" + this.state.selectedStock.id)
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
                <div className="row mx-0">
                    <div className="col-12 my-4">
                        <div className="pl-0 pl-md-4  flex-wrap d-flex align-items-center justify-content-between">
                            <Link to={"/stocks/new"} className={"btn btn-primary"} >
                                + Új készlet felvétele
                                    </Link>
                            <button
                                className={`btn btn-primary my-3 my-md-0 ${this.state.showChart ? "btn-info" : "btn-warning"}`}
                                onClick={() => this.setState({
                                    showChart: !this.state.showChart
                                })}>
                                {
                                    this.state.showChart ? <>
                                        <FontAwesomeIcon icon={faEyeSlash} className="mr-2" />
                                    Diagram elrejtése
                                   </> : <>
                                            <FontAwesomeIcon icon={faEye} className="mr-2" />
                                   Diagram megjelenítése
                                   </>
                                }
                            </button>
                        </div>
                    </div>
                    <div className={`col-12 ${this.state.showChart ? "col-md-8" : ""} order-2 order-md-1`}>
                        <div className={"pl-0 pl-md-4"}>
                            <ul className="list-group">
                                <li className="list-group-item d-none d-md-block">
                                    <div className="row">
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
                    <div className={`col-12 col-md-4 order-1 order-md-2 ${!this.state.showChart ? "d-none" : ""}`}>
                        <div className={"sticky-chart"}>
                            <Pie data={{
                                labels: [...this.state.chartStocks.map((data) => data.product.name)],
                                datasets: [
                                    {
                                        label: "Eladások",
                                        data: [...this.state.chartStocks.map((data) => data.quantity)],
                                        backgroundColor: [
                                            'rgba(255, 255, 102, 0.5)', //sárga
                                            'rgba(236, 19, 19, 0.5)',   //piros
                                            'rgba(189, 102, 15, 0.5)',  //barna
                                            'rgba(124, 179, 66, 0.5)', //zold
                                            'rgba(30, 136, 229, 0.5)',  //kek
                                            'rgba(94, 53, 177, 0.5)',  //lila
                                            'rgba(255, 255, 102, 0.5)', //sárga
                                            'rgba(236, 19, 19, 0.5)',   //piros
                                            'rgba(189, 102, 15, 0.5)',  //barna
                                            'rgba(124, 179, 66, 0.5)', //zold
                                            'rgba(30, 136, 229, 0.5)',  //kek
                                            'rgba(94, 53, 177, 0.5)',   //lila

                                        ],
                                        borderColor: [
                                            'rgba(230, 230, 0)', //sarga
                                            'rgba(198, 57, 57)', //piros
                                            'rgba(189, 102, 15)', //barna
                                            'rgba(124, 179, 66,1)', //zold
                                            'rgba(30, 136, 229, 1)', //kek
                                            'rgba(94, 53, 177, 1)', //lila
                                            'rgba(230, 230, 0)', //sarga
                                            'rgba(198, 57, 57)', //piros
                                            'rgba(189, 102, 15)', //barna
                                            'rgba(124, 179, 66,1)', //zold
                                            'rgba(30, 136, 229, 1)', //kek
                                            'rgba(94, 53, 177, 1)', //lila
                                        ],
                                        borderWidth: 3
                                    }
                                ]
                            }} />
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