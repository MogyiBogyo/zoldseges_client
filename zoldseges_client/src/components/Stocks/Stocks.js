import React, { Component } from 'react';
import axios from '../../axios-products';
import Stock from './Stock/Stock';

import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import "./Stocks.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Pie } from 'react-chartjs-2';

class Stocks extends Component {
    state = {
        stocks: [],
        chartStocks: [],
        colors: [],
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
            this.colorGenerateHandler();
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

    colorGenerateHandler = () => {
        let generatedColors = [];
        this.state.chartStocks.map((stock) => {
            let obj = {};
            let R = Math.floor(Math.random() * 255) + 1;
            let G = Math.floor(Math.random() * 255) + 1;
            let B = Math.floor(Math.random() * 255) + 1;
            //console.log(R , G, B);
            obj["r"] = R;
            obj["g"] = G;
            obj["b"] = B;
            obj["opacity"] = 0.5;
            generatedColors.push(obj);
        })
        //console.log(generatedColors);
        this.setState({
            colors: [...generatedColors]
        });
        //console.log(this.state.colors);
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
                    <div className={`col-12 ${this.state.showChart ? "col-md-8" : "col-md-10 "} order-2 order-md-1`}>
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
                                        backgroundColor: [...this.state.colors.map((color) => `rgba(${color.r} , ${color.g}, ${color.b}, 0.5)`)],
                                        borderColor: [...this.state.colors.map((color) => `rgba(${color.r} , ${color.g}, ${color.b})`)],
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