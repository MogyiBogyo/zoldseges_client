import React, { Component } from 'react';
import axios from '../../../axios-products';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { navigateToCustomPath } from "../../../App";


class CreateProduct extends Component {

    state = {
        name: "",
        is_sale: false,
        price: "",
        category: null,
        sale_price: "",
        serverError: false,
        successSave: false,
        categories: null,

    }

    componentDidMount() {
        //axios, be
        axios.get("/categories")

    }

    handleSave = (event) => {
        event.preventDefault();
        if (true) {
            axios.post("products/", {
                isSale: this.state.is_sale,
                name: this.state.name,
                salePrice: this.state.sale_price,
                category: this.state.category,
                price: this.state.price
            })
                .then(() => {
                    this.setState({
                        successSave: true,
                    })
                }).catch(() => this.setState({
                    serverError: true
                }));
        }
    }


    handleRedirectToCategoriesPage = () => {
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
                                    <form onSubmit={(event) => this.handleSave(event)}>
                                        <div className="form-group">
                                            <label for="name">Név</label>
                                            <input type="text" className="form-control" id="name" onChange={(e) => this.setState({
                                                name: e.target.value
                                            })} />
                                            <small className="form-text text-muted">A név nem lehet azonos a rendszerben megtalálhatókkal</small>
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="is_sale" onChange={() => this.setState({
                                                is_sale: !this.state.is_sale
                                            })} />
                                            <label className="form-check-label" for="is_sale">Akciós</label>
                                        </div>
                                        <div className="form-group">
                                            <label for="sale_price">Akció mértéke</label>
                                            <input type="text" className="form-control" id="sale_price" disabled={!this.state.is_sale} onChange={(e) => this.setState({
                                                sale_price: e.target.value
                                            })} />
                                        </div>
                                        <div className="form-group">
                                            <label for="price">Ár</label>
                                            <input type="text" className="form-control" id="price" disabled={!this.state.price} onChange={(e) => this.setState({
                                                price: e.target.value
                                            })} />
                                        </div>

                                        <button type="submit" className="btn btn-primary">Mentés</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        );
    }

}

export default CreateProduct;