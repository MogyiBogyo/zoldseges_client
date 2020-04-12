import React, { Component } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import axios from '../../../axios-products';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { navigateToCustomPath } from "../../../App";

import ProductForm from './ProductForm';

class EditProduct extends Component {

    state = {
        successSave: false,
        serverError: false,
        serverErrorText: "",
        product: null,
        selectedCategory: null,
        categories: []
    }

    componentDidMount() {
        const id = this.props.computedMatch.params.id
        if (!!id) {
            axios.get("products/" + id)
                .then((response) => {
                    this.setState({
                        product: response.data
                    })
                })
                .catch((error) => {
                    console.log("error ",error);
                    if (!!error.response && error.response.status === 404) {
                        this.setState({
                            product: false,
                            serverErrorText: "Nem létezik ilyen termék"
                        })
                    }
                });
        }

    }

    getCategories = () => {
        axios.get("/categories")
            .then(response => {
                const fetchedCategories = [];
                for (let key in response.data) {
                    fetchedCategories.push({
                        ...response.data[key]
                    });
                }
                this.setState({
                    categories: fetchedCategories,
                    loading: false
                });
            }).catch(function (error) {
                this.setState({
                    serverError: true
                })
            });
    }



    handleSave = (data) => {
        console.log(data);
        console.log(this.state.product);
        axios.put("products/" + this.state.product.id, { ...data })
            .then(() => {
                this.setState({
                    successSave: true,
                })
            }).catch((error) => {
                console.log("error", error)
                if (error.response.status === 400) {
                    this.setState({
                        serverError: true,
                        serverErrorText: "Ilyen névvel már van termék"
                    })
                } else {
                    this.setState({
                        serverError: true,
                        serverErrorText: "Ismeretlen szerver hiva"
                    })
                }

            });
    }

    handleRedirectToProductsPage = () => {
        navigateToCustomPath("/products");
    }



    render() {
        return (
            <div>
                <div className={"container"}>
                    <div className="row my-3">
                        <div className="col-12 col-md-8 offset-md-2">
                            <Link to={"/products"} className={"btn btn-warning"} >
                                <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> Vissza
                            </Link>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-12 col-md-8 offset-md-2">
                            {
                                this.state.product === null ?
                                    <div className="d-flex align-items-center justify-content-center flex-column pt-4">

                                        <ClipLoader
                                            size={150}
                                            loading={this.state.product === null}
                                        />
                                        <h5 className="text-center mt-4">Termék betöltése folyamatban</h5>
                                    </div>
                                    : null
                            }
                            {
                                !!this.state.product ?
                                    <div className="card">
                                        <div className="card-header">
                                            Termék szerkesztése
                                    </div>
                                        <div className="card-body">
                                            <ProductForm
                                                
                                                save={(sendParams) => this.handleSave(sendParams)}                                            
                                                product={this.state.product}
                                            />
                                        </div>
                                    </div>
                                    : null
                            }
                            {
                                this.state.product === false ?
                                    <div className="alert alert-danger text-center">
                                        {this.state.serverErrorText}
                                    </div>
                                    : null
                            }
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
                    {this.state.serverErrorText}
                </SweetAlert>
                <SweetAlert
                    success
                    show={this.state.successSave}
                    title="Sikeres"
                    onConfirm={() => this.handleRedirectToProductsPage()}
                    onCancel={() => this.handleRedirectToProductsPage()}
                    btnSize="sm" >
                    Mentés!
                </SweetAlert>
            </div>
        );
    }

}

export default EditProduct;
