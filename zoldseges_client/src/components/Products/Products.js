import React, { Component } from 'react'
import Product from './Product/Product';
import axios from '../../axios-products';

import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

class Products extends Component {
    state = {
        products: [],
        loading: true,
        serverError: false,
        deleteQuestion: false,
        showDeleteQuestion: false,
        selectedProduct: null,
        successDelete: false,
        deleteErrorText: ""
    }

    componentDidMount() {
        this.getProducts();
    }


    getProducts = () => {
        axios.get("products/")
            .then(response => {
                //console.log(response);
                const fetchedProducts = [];
                for (let key in response.data) {
                    fetchedProducts.push({
                        ...response.data[key]
                    });
                }
                this.setState({
                    products: fetchedProducts,
                    loading: false
                })
            }).catch(function (error) {
                this.setState({
                    serverError: true
                })
            });
    }

    handleDelete = () => {
        if (this.state.selectedProduct) {
            axios.delete("products/" + this.state.selectedProduct.id)
                .then(() => {
                    this.getProducts();
                    this.setState({
                        showDeleteQuestion: false,
                        selectedProduct: null,
                        successDelete: true,

                    })
                }).catch((error) => {
                    if (error.response.status === 400) {
                        this.setState({
                            showDeleteQuestion: false,
                            selectedProduct: null,
                            serverError: true,
                            deleteErrorText: "Nem lehet törölni a terméket mert hivatkoznak rá!"
                        })
                    } else {
                        this.setState({
                            showDeleteQuestion: false,
                            selectedProduct: null,
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
                    <div className="row my-3">
                        <div className="col-12">
                            <Link to={"/products/new"} className={"btn btn-primary"} >
                                + Új termék felvétele
                            </Link>
                        </div>
                    </div>
                    <ul className="list-group">
                        <li className="list-group-item d-none d-md-block">
                            <div className="row">
                                <div className="col-12 col-md-1">
                                    <b>
                                        ID:
                                </b>

                                </div>
                                <div className="col-12 col-md-2">
                                    <b>
                                        Név:
                                </b>

                                </div>
                                <div className="col-12 col-md-2 d-flex justify-content-center">
                                    <b>
                                        Ár
                                </b>

                                </div>
                                <div className="col-12 col-md-1 d-flex justify-content-center">
                                    <b>
                                        Akciós
                                </b>

                                </div>
                                <div className="col-12 col-md-2 d-flex justify-content-center">
                                    <b>
                                        Akciós ár
                                </b>
                                </div>
                                <div className="col-12 col-md-2">
                                    <b>
                                       Kategória
                                </b>


                                </div>
                                <div className="col-12 col-md-2 d-flex justify-content-center">
                                    <b>
                                        Művelet
                                </b>
                                </div>
                            </div>
                        </li>
                        {this.state.products.map(product => (
                            <Product
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                category={product.category}
                                price={product.price}
                                isSale={product.isSale}
                                salePrice={product.salePrice}
                                showDeleteQuestion={() => this.setState({
                                    showDeleteQuestion: true,
                                    selectedProduct: product
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
                        selectedProduct: null
                    })}
                    btnSize="sm" >
                    {
                        !!this.state.selectedProduct ? <div>
                            Biztos törli a <b>
                                {this.state.selectedProduct.name}
                            </b> terméket?
                                </div> : null
                    }
                </SweetAlert>
            </>
        );
    }

}

export default Products;