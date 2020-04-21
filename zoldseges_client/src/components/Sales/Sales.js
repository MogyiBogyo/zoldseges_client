import React, { Component } from 'react';
import axios from '../../axios-products';
import Sale from './Sale/Sale';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import _ from 'lodash';
import { HorizontalBar } from 'react-chartjs-2';


class Sales extends Component {

    state = {
        sales: [],
        loading: false,
        selectedSale: null,
        serverError: false,
        deleteQuestion: false,
        showDeleteQuestion: false,
        successDelete: false,
        deleteErrorText: "",
        //product, db
        uniqueSalesForChart: []
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
                uniqueSalesForChart: [...uniqueSales],
                loading: false
            })
            this.hendleQuantityCount();
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


    hendleQuantityCount = () => {
        let salesCopy = [...this.state.sales];
        let uniqueSalesCopy = [...this.state.uniqueSalesForChart];

        for (let i in salesCopy) {
            for (let k in uniqueSalesCopy) {
                if (salesCopy[i].product.name === uniqueSalesCopy[k].product.name) {
                    uniqueSalesCopy[k].quantity = uniqueSalesCopy[k].quantity + salesCopy[i].quantity;
                }
            }
        }
        console.log(uniqueSalesCopy);
        this.setState({
            uniqueSalesForChart: [...uniqueSalesCopy]
        });
        console.log(this.state.uniqueSalesForChart, "state");
    }


    render() {
        return (
            <>
                <div className={"mx-5"}>
                    <div className="row my-3">
                        <div className="col-12">
                            <Link to={"/sales/new"} className={"btn btn-primary"} >
                                + Új Eladás felvétele
                            </Link>
                        </div>
                    </div>
                    <ul className="list-group">
                        <li className="list-group-item d-none d-md-block">
                            <div className="row">
                                <div className="col-12 col-md-2">
                                    <b>
                                        Termék
                                    </b>
                                </div>
                                <div className="col-12 col-md-2">
                                    <b>
                                        Mennyiség
                                    </b>
                                </div>
                                <div className="col-12 col-md-2 ">
                                    <b>
                                        Ár
                                    </b>
                                </div>
                                <div className="col-12 col-md-3">
                                    <b>
                                        Vevő
                                    </b>
                                </div>
                                <div className="col-12 col-md-2">
                                    <b>
                                        Dátum
                                    </b>
                                </div>
                                <div className="col-12 col-md-1  ">
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

                <div className={"col-12 col-md-5 d-flex align-items-center"}>

                    <HorizontalBar data={{
                        labels: [...this.state.uniqueSalesForChart.map((data) => data.product.name)],
                        datasets: [
                            {
                                label: "Eladások",
                                data: [...this.state.uniqueSalesForChart.map((data) => data.quantity)],
                                backgroundColor: [
                                    'rgba(255, 255, 102, 0.5)', //s
                                    'rgba(236, 19, 19, 0.5)',   //p
                                    'rgba(189, 102, 15, 0.5)',  //barna
                                    'rgba(124, 179, 66, 0.5)', //zold
                                    'rgba(30, 136, 229, 0.5)',  //kek
                                    'rgba(94, 53, 177, 0.5)',  //lila
                                    'rgba(255, 255, 102, 0.5)', //s
                                    'rgba(236, 19, 19, 0.5)',   //p
                                    'rgba(189, 102, 15, 0.5)',  //barna
                                    'rgba(124, 179, 66, 0.5)', //zold
                                    'rgba(30, 136, 229, 0.5)',  //kek
                                    'rgba(94, 53, 177, 0.5)',
                                    
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
                                    'rgba(94, 53, 177, 1)',
                                   
                                    
                                ],
                                borderWidth: 3
                            }
                        ]
                    }}

                    />
                </div>
            </>

        );
    }
}

export default Sales;
