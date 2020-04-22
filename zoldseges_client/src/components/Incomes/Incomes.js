import React, { Component } from 'react';
import axios from '../../axios-products';
import Income from './Income/Income';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

class Incomes extends Component {
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
    }


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
    }


    filterHandler = (event) => {
        event.preventDefault();
        var foundedIncomes = [];
        this.state.incomes.map((income) => {

            if (income.product.name.includes(event.target.value)) {
                foundedIncomes.push(income);
            }
        });

        this.setState({
            filteredIncomes: [...foundedIncomes]
        })

    }


    render() {
        return (
            <>
                <div className={"mx-5"}>
                    <div className="row my-3">
                        <div className="col-12 col-md-5">
                            <Link to={"/incomes/new"} className={"btn btn-primary"} >
                                + Új árubevétel felvétele
                            </Link>
                        </div>
                        <div className="filter-list col-md-5" style={{ width: "200px" }}>
                            <form>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control " placeholder="Keresés" onChange={this.filterHandler} />
                                </fieldset>
                            </form>
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
                                        Eladó
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