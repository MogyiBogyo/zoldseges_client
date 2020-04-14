import React, { Component } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import axios from '../../../axios-products';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { navigateToCustomPath } from "../../../App";
import CategoryForm from './CategoryForm';


class EditCategory extends Component {

    state = {
        successSave: false,
        serverError: false,
        serverErrorText: "",
        category: null
    }

    componentDidMount(){
        const id = this.props.computedMatch.params.id
        if(!!id){        
            axios().get("categories/"+id)
                .then((response) => {
                    this.setState({
                        category: response.data
                    })
                })
                .catch((error) => {
                    console.log(error.response.status);
                    if(error.response.status === 404){ 
                        this.setState({
                            category: false,
                            serverErrorText: "Nem létezik ilyen kategória"
                        })
                    }
                });
        }
    }


    handleSave = (data) => {
        axios().put("categories/"+this.state.category.id,{...data})
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


    render(){
        return(
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
                                {
                                    this.state.category === null ?
                                    <div className="d-flex align-items-center justify-content-center flex-column pt-4">
                                        
                                        <ClipLoader 
                                            size={150}
                                            loading={this.state.category === null}
                                            />
                                            <h5 className="text-center mt-4">Kategória betöltése folyamatban</h5>
                                    </div>
                                    : null
                                }
                            {
                                !!this.state.category ?
                                <div className="card">    
                                    <div className="card-header">
                                        Kategória szerkesztése
                                    </div>
                                    <div className="card-body">
                                            <CategoryForm 
                                                save={(sendParams) => this.handleSave(sendParams) }
                                                category={this.state.category}
                                             />
                                    </div>
                                </div>  
                                :  null
                            }
                            {
                                this.state.category === false ?
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
                        btnSize="sm">
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
        )
    }
}

export default EditCategory;