import React, { Component } from 'react';
import axios from '../../axios-products';
import Income from './Income/Income';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class Incomes extends Component {

    searchRef = null

    state = {
        incomes: [],
        filteredIncomes: [],
        loading: true,
        selectedIncome: null,
        serverError: false,
        deleteQuestion: false,
        showDeleteQuestion: false,
        successDelete: false,
        deleteErrorText: ""
    }

    componentDidMount() {
        this.getIncomes();

    }



    getIncomes = () => {
        axios().get("incomes/").then(response => {
            const fetchedIncomes = [];
            for (let key in response.data) {
                fetchedIncomes.push({
                    ...response.data[key]
                });
            }
            this.setState({
                incomes: [...fetchedIncomes],
                filteredIncomes: null
            })
        }).catch(function (error) {
            this.setState({
                serverError: true
            })

        });
    };


    handleDelete = () => {
        if (this.state.selectedIncome) {
            axios().delete("incomes/" + this.state.selectedIncome.id)
                .then(() => {
                    this.getIncomes();
                    this.setState({
                        showDeleteQuestion: false,
                        selectedIncome: null,
                        successDelete: true,

                    })
                }).catch((error) => {
                    if (error.response.status === 400) {
                        this.setState({
                            showDeleteQuestion: false,
                            selectedIncome: null,
                            serverError: true,
                            deleteErrorText: "Nem létezik ilyen azonosítóju árubevétel!"
                        })
                    } else {
                        this.setState({
                            showDeleteQuestion: false,
                            selectedIncome: null,
                            serverError: true,
                            deleteErrorText: "Ismeretlen szerverhiba!"
                        })
                    }
                });
        }
    };


    filterHandler = (event) => {
        event.preventDefault();
        var foundedIncomes = [];
        this.state.incomes.map((income) => {
            let productName = (income.product.name).toLowerCase();
            if (productName.includes((event.target.value).toLowerCase())) {
                foundedIncomes.push(income);
            }
        });

        this.setState({
            filteredIncomes: [...foundedIncomes]
        })

    };

    filterClearHandler = () => {
        if (!!this.searchRef) {
            this.searchRef.value = "";
            this.setState({
                filteredIncomes: null
            })

        }
    };

    sortArray = (type) => {
        let unsorteIncomes = [...this.state.incomes];
        switch (type) {
            case "date":
                this.setState({
                    incomes: [...unsorteIncomes.sort((a, b) => (a.date > b.date) ? 1 : (a.date === b.date) ? ((a.product.name > b.product.name) ? 1 : -1) : -1)]
                });
                break;
            case "product":
                this.setState({
                    incomes: [...unsorteIncomes.sort((a, b) => (a.product.name > b.product.name) ? 1 : (a.product.name === b.product.name) ? ((a.date > b.date) ? 1 : -1) : -1)]
                });
                break;
            case "quantity":
                this.setState({
                    incomes: [...unsorteIncomes.sort((a, b) => (a.quantity > b.quantity) ? 1 : (a.quantity === b.quantity) ? ((a.product.name > b.product.name) ? 1 : -1) : -1)]
                });
                break;
            case "price":
                this.setState({
                    incomes: [...unsorteIncomes.sort((a, b) => (a.price > b.price) ? 1 : (a.price === b.price) ? ((a.product.name > b.product.name) ? 1 : -1) : -1)]
                });
                break;
            case "seller":
                this.setState({
                    incomes: [...unsorteIncomes.sort((a, b) => (a.seller > b.seller) ? 1 : (a.seller === b.seller) ? ((a.product.name > b.product.name) ? 1 : -1) : -1)]
                });
                break;
        }
    }

    render() {

        return (
            <>
                <div className={"mx-5"}>
                    <div className="row my-3 align-items-center">
                        <div className="col-12 col-md-4">
                            <Link to={"/incomes/new"} className={"btn btn-primary"} >
                                + Új árubevétel felvétele
                            </Link>
                        </div>
                        <div className="col-12 filter-list col-md-4 offset-md-4" >
                            <form className={"d-flex w-100"}>
                                <fieldset className="form-group mb-0 w-100">
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Keresés"
                                        ref={(elementRef) => this.searchRef = elementRef}
                                        onChange={this.filterHandler} />
                                </fieldset>
                                {
                                    this.state.filteredIncomes ?
                                        <div className={"btn btn-danger"} onClick={() => this.filterClearHandler()}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </div> : null
                                }
                            </form>
                        </div>
                    </div>
                    <ul className="list-group">
                        <li className="list-group-item d-none d-md-block">
                            <div className="row">
                                <div onClick={() => this.sortArray("product")} className="col-12 col-md-2">
                                    <b >
                                        Termék
                                    </b>
                                </div>
                                <div onClick={() => this.sortArray("quantity")} className="col-12 col-md-2">
                                    <b>
                                        Mennyiség
                                    </b>
                                </div>
                                <div onClick={() => this.sortArray("price")} className="col-12 col-md-2">
                                    <b>
                                        Ár
                                    </b>
                                </div>
                                <div onClick={() => this.sortArray("seller")} className="col-12 col-md-2">
                                    <b>
                                        Eladó
                                    </b>
                                </div>
                                <div onClick={() => this.sortArray("date")} className="col-12 col-md-2">
                                    <b>
                                        Dátum
                                    </b>
                                </div>
                                <div className="col-12 col-md-2 d-flex justify-content-center">
                                    <b>
                                        Művelet
                                    </b>
                                </div>
                            </div>
                        </li>
                        {!!this.state.filteredIncomes ? this.state.filteredIncomes.map(income => (
                            <Income
                                key={income.id}
                                id={income.id}
                                seller={income.seller}
                                date={income.date}
                                price={income.price}
                                quantity={income.quantity}
                                product={income.product}
                                showDeleteQuestion={() => this.setState({
                                    showDeleteQuestion: true,
                                    selectedIncome: income
                                })}
                            />
                        )) : this.state.incomes.map(income => (
                            <Income
                                key={income.id}
                                id={income.id}
                                seller={income.seller}
                                date={income.date}
                                price={income.price}
                                quantity={income.quantity}
                                product={income.product}
                                showDeleteQuestion={() => this.setState({
                                    showDeleteQuestion: true,
                                    selectedIncome: income
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
                        selectedIncome: null
                    })}
                    btnSize="sm" >
                    {
                        !!this.state.selectedIncome ? <div>
                            Biztos törli az árubevételt?
                                </div> : null
                    }
                </SweetAlert>
            </>
        );
    }

}

export default Incomes;