import React, { Component } from 'react';
import axios from '../../../axios-products';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { navigateToCustomPath } from "../../../App";
import CategoryForm from './CategoryForm';

class CreateCategory extends Component {

    state = {
        /* categories: [
            { id: 1, is_sale: false, name: "zöldség", sale_price: 200 },
            { id: 2, is_sale: false, name: "gyümölcs", sale_price: 200 },
            { id: 3, is_sale: false, name: "magvak", sale_price: 200 }
        ] */
        
        loading: true,
        serverError: false,
        serverErrorText: "",
        successSave: false,
    }

    handleSave = (data) => {
        axios.post("categories/",{...data})
                .then(() => {            
                    this.setState({                        
                        successSave: true,
                    })
                }).catch((error) => {
                    console.log("error",error)
                    if(error.response.status === 400){ 
                        this.setState({
                            serverError: true,
                            serverErrorText: "Ilyen névvel már van kategória"
                        })
                    }else{
                        this.setState({
                            serverError: true,
                            serverErrorText: "Ismeretlen szerver hiva"
                        })
                    }
                    
                });
    }

    handleRedirectToCategoriesPage= () => {
        navigateToCustomPath("/categories");
    }

    render() {

        return (
            <div>
                <div className={"container"}>
                    <div className="row my-3">
                        <div className="col-12 col-md-8 offset-md-2">
                            <Link to={"/categories"} className={"btn btn-warning"} >
                                <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> Vissza
                            </Link>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-12 col-md-8 offset-md-2">
                            <div className="card">    
                                <div className="card-header">
                                    Új kategória felvétele
                                </div>
                                <div className="card-body">
                                        <CategoryForm save={(data) => this.handleSave(data) } />
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
                        onConfirm={() => this.handleRedirectToCategoriesPage()}
                        onCancel={() => this.handleRedirectToCategoriesPage()}
                        btnSize="sm"
                    >
                        Mentés!              
                </SweetAlert>

            </div>
        );

    }

}

export default CreateCategory;


