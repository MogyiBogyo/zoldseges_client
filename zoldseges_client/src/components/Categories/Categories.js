import React, { Component } from 'react';
import axios from '../../axios-products';
import Category from './Category/Category';

import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';


class Categories extends Component {

    state = {
        /* categories: [
            { id: 1, is_sale: false, name: "zöldség", sale_price: 200 },
            { id: 2, is_sale: false, name: "gyümölcs", sale_price: 200 },
            { id: 3, is_sale: false, name: "magvak", sale_price: 200 }
        ] */
        categories: [],
        loading: true,
        serverError: false,
        deleteQuestion: false,
        showDeleteQuestion: false,
        selectedCategory: null,
        successDelete: false,
        deleteErrorText: ""
    }

    componentDidMount() {
        this.getCategories();
    }


    getCategories = () => {
        axios().get("/categories")
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

    handleDelete = () => {
        if (this.state.selectedCategory) {
            axios().delete("categories/" + this.state.selectedCategory.id)
                .then(() => {
                    this.getCategories();
                    this.setState({
                        showDeleteQuestion: false,
                        selectedCategory: null,
                        successDelete: true,

                    })
                }).catch((error) => {
                    if (error.response.status === 400) {
                        this.setState({
                            showDeleteQuestion: false,
                            selectedCategory: null,
                            serverError: true,
                            deleteErrorText: "Nem lehet törölni a kategóiát mert tartozik hozzá termék!"
                        })
                    } else {
                        this.setState({
                            showDeleteQuestion: false,
                            selectedCategory: null,
                            serverError: true,
                            deleteErrorText: "Ismeretlen szerverhiba!"
                        })
                    }
                });
        }
    }

    sortArray = (type) => {
        let unsortedCategories = [...this.state.categories];
        switch (type) {
            case "name":
                this.setState({
                    categories: [...unsortedCategories.sort((a, b) => (a.name > b.name) ? 1 : -1)]
                });
                break;
            case "isSale":
                this.setState({
                    categories: [...unsortedCategories.sort((a, b) => (a.isSale > b.isSale) ? 1 : (a.isSale === b.isSale) ? ((a.name > b.name) ? 1 : -1) : -1)]
                });
                break;
            case "salePrice":
                this.setState({
                    categories: [...unsortedCategories.sort((a, b) => (a.salePrice > b.salePrice) ? 1 : (a.salePrice === b.salePrice) ? ((a.name > b.name) ? 1 : -1) : -1)]
                });
                break;
        }
    }

    render() {

        return (
            <>
                <div className={"container"}>
                    <div className="col-12 col-md-8 offset-md-2">
                        <div className="row my-3">
                            <div className="col-12">
                                <Link to={"/categories/new"} className={"btn btn-primary"} >
                                    + Új kategória felvétele
                            </Link>
                            </div>
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item d-none d-md-block">
                                <div className="row">

                                    <div onClick={() => this.sortArray("name")} className="col-12 col-md-4">
                                        <b>
                                            Név:
                                        </b>
                                    </div>
                                    <div onClick={() => this.sortArray("isSale")} className="col-12 col-md-2 ">
                                        <b>
                                            Akciós
                                    </b>
                                    </div>
                                    <div onClick={() => this.sortArray("salePrice")} className="col-12 col-md-3">
                                        <b>
                                            Akciós ár
                                    </b>
                                    </div>
                                    <div className="col-12 col-md-3">
                                        <b>
                                            Műveletek
                                    </b>
                                    </div>
                                </div>
                            </li>
                            {this.state.categories.map(category => (
                                <Category
                                    key={category.id}
                                    id={category.id}
                                    name={category.name}
                                    isSale={category.sale}
                                    salePrice={category.salePrice}
                                    showDeleteQuestion={() => this.setState({
                                        showDeleteQuestion: true,
                                        selectedCategory: category
                                    })}
                                />
                            ))}
                        </ul>
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
                        selectedCategory: null
                    })}
                    btnSize="sm" >
                    {
                        !!this.state.selectedCategory ? <div>
                            Biztos törli a <b>
                                {this.state.selectedCategory.name}
                            </b> kategóriát?
                                </div> : null
                    }
                </SweetAlert>
            </>
        );

    }

}

export default Categories;


