import React, { Component } from 'react';
import axios from '../../axios-products';
import Category from './Category/Category';
import classes from './Categories.module.css';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { navigateToCustomPath } from "../../App";

class CreateCategory extends Component {

    state = {
        /* categories: [
            { id: 1, is_sale: false, name: "zöldség", sale_price: 200 },
            { id: 2, is_sale: false, name: "gyümölcs", sale_price: 200 },
            { id: 3, is_sale: false, name: "magvak", sale_price: 200 }
        ] */
        name: "",
        sale_price: "",
        is_sale: false,
        loading: true,
        serverError: false,
        successSave: false,
    }

    componentDidMount() {

    }



    handleSave = (event) => {
        event.preventDefault();
        if(true){
            axios.post("categories/",{git 
                 isSale: this.state.is_sale,
                  name: this.state.name,                 
                  salePrice: this.state.sale_price 
            },
            {
                withCredentials: true,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
    
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

    handleRedirectToCategoriesPage= () => {
        navigateToCustomPath("/categories");
    }

    render() {
        /* let categories = this.state.categories.map((item, key) =>
            <li key={item.id}>{item.name}</li>); */

        return (
            <>
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
                            <div class="card-header">
                                Új kategória felvétele
                            </div>
                            <div className="card-body">
                                    <form onSubmit={(event) => this.handleSave(event) }>
                                        <div class="form-group">
                                            <label for="name">Név</label>
                                            <input type="text" class="form-control" id="name" onChange={(e) => this.setState({
                                                    name: e.target.value
                                            })}/>
                                            <small  class="form-text text-muted">A név nem lehet azonos a rendszerben megtalálhatókkal</small>
                                        </div>
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="is_sale" onChange={() => this.setState({
                                                is_sale: !this.state.is_sale
                                            })} />
                                            <label class="form-check-label" for="is_sale">Akciós</label>
                                        </div>
                                        <div class="form-group">
                                            <label for="sale_price">Akció mértéke</label>
                                            <input type="text" class="form-control" id="sale_price" disabled={!this.state.is_sale} onChange={(e) => this.setState({
                                                    sale_price: e.target.value
                                            })} />
                                        </div>
                                        
                                        <button type="submit" class="btn btn-primary">Mentés</button>
                                    </form>
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
                        Probléma a szerver kommunikációval!                                       
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

            </>
        );

    }

}

export default CreateCategory;


