import React, { Component } from 'react';
import axios from '../../axios-products';
import Sale from './Sale/Sale';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import _ from 'lodash';
import { HorizontalBar } from 'react-chartjs-2';
import "./Sales.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

class Sales extends Component {

    state = {
        sales: [],
        selectedSale: null,
        serverError: false,
        deleteQuestion: false,
        showDeleteQuestion: false,
        successDelete: false,
        deleteErrorText: "",
        //unique products
        uniqueSalesForChart: [],
        colors: [],
        showChart: true
    }

    componentDidMount() {
        this.getSales();
    }


    getSales = () => {
        axios().get("sales/").then(response => {
            const fetchedSales = [];
            let uniqueSales = [];
            for (let key in response.data) {
                fetchedSales.push({
                    ...response.data[key]
                });
            }
            uniqueSales = _.uniqBy(response.data, 'product.name');
            uniqueSales.map((unique) => unique.quantity = 0);
            this.setState({
                sales: [...fetchedSales],
                uniqueSalesForChart: [...uniqueSales]
            })
            this.handleQuantityCount();
            this.colorGenerateHandler();
        }).catch(function (error) {
            this.setState({
                serverError: true
            })
        });
    }

    handleDelete = () => {
        if (this.state.selectedSale) {
            axios().delete("sales/" + this.state.selectedSale.id)
                .then(() => {
                    this.getSales();
                    this.setState({
                        showDeleteQuestion: false,
                        selectedSale: null,
                        successDelete: true,

                    })
                }).catch((error) => {
                    if (error.response.status === 400) {
                        this.setState({
                            showDeleteQuestion: false,
                            selectedSale: null,
                            serverError: true,
                            deleteErrorText: "Nem lehet törölni az adatot mert hivatkoznak rá!"
                        })
                    } else {
                        this.setState({
                            showDeleteQuestion: false,
                            selectedSale: null,
                            serverError: true,
                            deleteErrorText: "Ismeretlen szerverhiba!"
                        })
                    }
                });
        }
    }


    handleQuantityCount = () => {
        let salesCopy = [...this.state.sales];
        let uniqueSalesCopy = [...this.state.uniqueSalesForChart];

        for (let i in salesCopy) {
            for (let k in uniqueSalesCopy) {
                if (salesCopy[i].product.name === uniqueSalesCopy[k].product.name) {
                    uniqueSalesCopy[k].quantity = uniqueSalesCopy[k].quantity + salesCopy[i].quantity;
                }
            }
        }
        this.setState({
            uniqueSalesForChart: [...uniqueSalesCopy]
        });
    }


    colorGenerateHandler = () => {
        let generatedColors = [];
        this.state.uniqueSalesForChart.map((stock) => {
            let obj = {};
            let R = Math.floor(Math.random() * 255) + 1;
            let G = Math.floor(Math.random() * 255) + 1;
            let B = Math.floor(Math.random() * 255) + 1;
            obj["r"] = R;
            obj["g"] = G;
            obj["b"] = B;
            obj["opacity"] = 0.5;
            generatedColors.push(obj);
        })
        this.setState({
            colors: [...generatedColors]
        });
    }

    sortArray = (type) => {
        let unsorteSales = [...this.state.sales];
        switch (type) {
            case "date":
                this.setState({
                    sales: [...unsorteSales.sort((a, b) => (a.date > b.date) ? 1 : (a.date === b.date) ? ((a.product.name > b.product.name) ? 1 : -1) : -1)]
                });
                break;
            case "product":
                this.setState({
                    sales: [...unsorteSales.sort((a, b) => (a.product.name > b.product.name) ? 1 : (a.product.name === b.product.name) ? ((a.date > b.date) ? 1 : -1) : -1)]
                });
                break;
            case "quantity":
                this.setState({
                    sales: [...unsorteSales.sort((a, b) => (a.quantity > b.quantity) ? 1 : (a.quantity === b.quantity) ? ((a.product.name > b.product.name) ? 1 : -1) : -1)]
                });
                break;
            case "price":
                this.setState({
                    sales: [...unsorteSales.sort((a, b) => (a.price > b.price) ? 1 : (a.price === b.price) ? ((a.product.name > b.product.name) ? 1 : -1) : -1)]
                });
                break;
            case "buyer":
                this.setState({
                    sales: [...unsorteSales.sort((a, b) => (a.buyer > b.buyer) ? 1 : (a.buyer === b.buyer) ? ((a.date > b.date) ? 1 : -1) : -1)]
                });
                break;
        }
    }

    render() {
        return (
            <>
                <div className={"row mx-0"}>
                    <div className="col-12 my-4">
                        <div className={"pl-0 pl-md-4  flex-wrap d-flex align-items-center justify-content-between"}>
                            <Link to={"/sales/new"} className={"btn btn-primary "} >
                                + Új Eladás felvétele
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
                                        <div onClick={() => this.sortArray("product")} className="col-12 col-md-2">
                                            <b>
                                                Termék
                                        </b>
                                        </div>
                                        <div onClick={() => this.sortArray("quantity")} className="col-12 col-md-2">
                                            <b>
                                                Mennyiség
                                            </b>
                                        </div>
                                        <div onClick={() => this.sortArray("price")} className="col-12 col-md-2 d-flex justify-content-center ">
                                            <b>
                                                Ár
                                            </b>
                                        </div>
                                        <div onClick={() => this.sortArray("buyer")} className="col-12 col-md-2 ">
                                            <b>
                                                Vevő
                                        </b>
                                        </div>
                                        <div onClick={() => this.sortArray("date")} className="col-12 col-md-2">
                                            <b>
                                                Dátum
                                        </b>
                                        </div>
                                        <div className="col-12 col-md-2 d-flex justify-content-center ">
                                            <b>
                                                Művelet
                                        </b>
                                        </div>
                                    </div>
                                </li>
                                {this.state.sales.map(sale => (
                                    <Sale
                                        key={sale.id}
                                        id={sale.id}
                                        date={sale.date}
                                        buyer={sale.buyer}
                                        price={sale.price}
                                        quantity={sale.quantity}
                                        product={sale.product}
                                        showDeleteQuestion={() => this.setState({
                                            showDeleteQuestion: true,
                                            selectedSale: sale
                                        })}

                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={`col-12 col-md-4 order-1 order-md-2 ${!this.state.showChart ? "d-none" : ""}`}>
                        <div className={"sticky-chart"}>
                            <HorizontalBar data={{
                                labels: [...this.state.uniqueSalesForChart.map((data) => data.product.name)],
                                datasets: [
                                    {
                                        label: "Eladások",
                                        data: [...this.state.uniqueSalesForChart.map((data) => data.quantity)],
                                        backgroundColor: [...this.state.colors.map((color) => `rgba(${color.r} , ${color.g}, ${color.b}, 0.5)`)],
                                        borderColor: [...this.state.colors.map((color) => `rgba(${color.r} , ${color.g}, ${color.b})`)],
                                        borderWidth: 2
                                    }
                                ]
                            }}

                            />
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
                        selectedSale: null
                    })}
                    btnSize="sm" >
                    {
                        !!this.state.selectedSale ? <div>
                            Biztos törli az eladást?
                                </div> : null
                    }
                </SweetAlert>


            </>

        );
    }
}

export default Sales;
