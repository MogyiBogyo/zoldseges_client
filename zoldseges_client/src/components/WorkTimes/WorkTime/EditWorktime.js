import React, { Component } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import axios from '../../../axios-products';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { navigateToCustomPath } from "../../../App";


import WorktimeForm from './WorktimeForm';

class EditWorktime extends Component {
    state = {
        successSave: false,
        serverError: false,
        serverErrorText: "",
        worktime: null
    }

    componentDidMount() {
        this.getWorktimes();
    }


    getWorktimes = () => {
        const id = this.props.computedMatch.params.id
        if (!!id) {
            axios().get("worktimes/" + id)
                .then(response => {
                    this.setState({
                        worktime: response.data
                    });
                }).catch((error) => {
                    if (!!error.response && error.response.status === 404) {
                        this.setState({
                            worktime: false,
                            serverErrorText: "Nem létezik ilyen beosztás"
                        })
                    }
                });
        }
    }

    handleSave = (data) => {
        axios().put("worktimes/" + this.state.worktime.id, { ...data })
            .then(() => {
                this.setState({
                    successSave: true,
                })
            }).catch((error) => {
                if (error.response.status === 400) {
                    this.setState({
                        serverError: true,
                        serverErrorText: "Hibás műszak adatok"
                    })
                } else {
                    this.setState({
                        serverError: true,
                        serverErrorText: "Ismeretlen szerver hiva"
                    })
                }

            });
    }

    handleRedirectToWorktimesPage = () => {
        navigateToCustomPath("/worktimes");
    }
    render() {
        return (
            <div>
                <div className={"container"}>
                    <div className="row my-3">
                        <div className="col-12 col-md-8 offset-md-2">
                            <Link to={"/worktimes"} className={"btn btn-warning"} >
                                <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> Vissza
                            </Link>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-12 col-md-8 offset-md-2">
                            {
                                this.state.worktime === null ?
                                    <div className="d-flex align-items-center justify-content-center flex-column pt-4">

                                        <ClipLoader
                                            size={150}
                                            loading={this.state.worktime === null}
                                        />
                                        <h5 className="text-center mt-4">Műszak betöltése folyamatban</h5>
                                    </div>
                                    : null
                            }
                            {
                                !!this.state.worktime ?
                                    <div className="card">
                                        <div className="card-header">
                                            Műszak szerkesztése
                                    </div>
                                        <div className="card-body">
                                            <WorktimeForm
                                                save={(sendParams) => this.handleSave(sendParams)}
                                                worktime={this.state.worktime}
                                            />
                                        </div>
                                    </div>
                                    : null
                            }
                            {
                                this.state.worktime === false ?
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
                    onConfirm={() => this.handleRedirectToWorktimesPage()}
                    onCancel={() => this.handleRedirectToWorktimesPage()}
                    btnSize="sm" >
                    Mentés!
                </SweetAlert>
            </div>
        );
    }

}


export default EditWorktime;