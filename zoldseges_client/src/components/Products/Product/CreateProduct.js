import React, { Component } from 'react';
import axios from '../../../axios-products';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { navigateToCustomPath } from "../../../App";
import ProductForm from './ProductForm';


class CreateProduct extends Component {

    state = {
        name: "",
        is_sale: false,
        price: "",
        category: null,
        sale_price: "",
        serverError: false,
        successSave: false
    }


    handleSave = (data) => {
        if (true) {
            axios().post("products/", {...data})
                .then(() => {
                    this.setState({
                        successSave: true,
                    })
                }).catch((error) => {
                    console.log("error",error)
                    if(error.response.status === 400){ 
                        this.setState({
                            serverError: true,
                            serverErrorText: "Ilyen névvel már van termék"
                        })
                    }else{
                        this.setState({
                            serverError: true,
                            serverErrorText: "Ismeretlen szerver hiva"
                        })
                    }
                });
        }
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
                            <div className="card">
                                <div className="card-header">
                                    Új termék felvétele
                                </div>
                                <div className="card-body">
                                    <ProductForm save={(data) => this.handleSave(data)} />
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
                        onConfirm={() => this.handleRedirectToProductsPage()}
                        onCancel={() => this.handleRedirectToProductsPage()}
                        btnSize="sm"
                    >
                        Mentés!              
                </SweetAlert>



            </div>
        );
    }

}

export default CreateProduct;