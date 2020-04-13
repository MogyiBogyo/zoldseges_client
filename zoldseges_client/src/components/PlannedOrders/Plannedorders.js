import React, { Component } from 'react';
import axios from '../../axios-products';
import Plannedorder from './PlannedOrder/Plannedorder';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

class Plannedorders extends Component {
    state = {
        plannedorders: [],
        loading: true,
        selectedPlan: null,
        serverError: false,
        deleteQuestion: false,
        showDeleteQuestion: false,
        successDelete: false,
        deleteErrorText: ""
    }

    componentDidMount() {
        this.getPlannerOrders();
    }


    getPlannerOrders = () => {
        axios.get("plans/")
            .then(response => {
                const fetchedPlans = [];
                for (let key in response.data) {
                    fetchedPlans.push({
                        ...response.data[key]
                    });
                }
                this.setState({ plannedorders: fetchedPlans, loading: false })
            }).catch(function (error) {
                this.setState({
                    serverError: true
                })
            });
    }


    handleDelete = () => {
        if (this.state.selectedPlan) {
            axios.delete("plans/" + this.state.selectedPlan.id)
                .then(() => {
                    this.getPlannerOrders();
                    this.setState({
                        showDeleteQuestion: false,
                        selectedPlan: null,
                        successDelete: true,
                    })
                }).catch((error) => {
                    if (error.response.status === 400) {
                        this.setState({
                            showDeleteQuestion: false,
                            selectedPlan: null,
                            serverError: true,
                            deleteErrorText: "Nem lehet törölni készletet mert hivatkoznak rá!"
                        })
                    } else {
                        this.setState({
                            showDeleteQuestion: false,
                            selectedPlan: null,
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
                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2">
                            <div className="row my-3">
                                <div className="col-12 ">
                                    <Link to={"/orders/new"} className={"btn btn-primary"} >
                                        + Új tervezett rendelés felvétele
                            </Link>
                                </div>
                            </div>
                            <ul className="list-group">
                                <li className="list-group-item d-none d-md-block">
                                    <div className="row">
                                        <div className="col-12 col-md-2">
                                            <b>
                                                ID:
                                    </b>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <b>
                                                Termék
                                    </b>
                                        </div>
                                        <div className="col-12 col-md-4 ">
                                            <b>
                                                Mennyiség
                                    </b>
                                        </div>
                                        <div className="col-12 col-md-2 d-flex justify-content-center ">
                                            <b>
                                                Művelet
                                    </b>
                                        </div>
                                    </div>
                                </li>
                                {this.state.plannedorders.map(plan => (
                                    <Plannedorder
                                        key={plan.id}
                                        id={plan.id}
                                        product={plan.product}
                                        quantity={plan.quantity}
                                        showDeleteQuestion={() => this.setState({
                                            showDeleteQuestion: true,
                                            selectedPlan: plan
                                        })}
                                    />
                                ))}
                            </ul>
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
                        selectedPlan: null
                    })}
                    btnSize="sm" >
                    {
                        !!this.state.selectedPlan ? <div>
                            Biztos törli a tervezett rendelést?
                                </div> : null
                    }
                </SweetAlert>
            </>
        );
    }

}

export default Plannedorders;