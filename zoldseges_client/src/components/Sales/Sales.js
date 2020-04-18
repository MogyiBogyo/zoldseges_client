import React, { Component } from 'react';
import axios from '../../axios-products';
import Sale from './Sale/Sale';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';


class Sales extends Component {

    state = {
        sales: [],
        loading: false,
        selectedSale: null,
        serverError: false,
        deleteQuestion: false,
        showDeleteQuestion: false,
        successDelete: false,
        deleteErrorText: ""
    }

    componentDidMount() {
        this.getSales();
    }


    getSales = () => {
        axios().get("sales/").then(response => {
            const fetchedSales = [];
            for (let key in response.data) {
                fetchedSales.push({
                    ...response.data[key]
                });
            }
            this.setState({ sales: fetchedSales, loading: false })
        }).catch(function (error) {
            console.log('Error on sales');
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
            </>

        );
    }
}

export default Sales;
