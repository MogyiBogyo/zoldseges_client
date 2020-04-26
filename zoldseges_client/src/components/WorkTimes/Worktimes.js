import React, { Component } from 'react';
import axios from '../../axios-products';
import Worktime from './WorkTime/Worktime';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class Worktimes extends Component {

    searchRef = null

    state = {
        worktimes: [],
        filteredWorktimes: [],
        selectedWorktime: null,
        serverError: false,
        deleteQuestion: false,
        showDeleteQuestion: false,
        successDelete: false,
        deleteErrorText: "",
        showCreateButton: false,
    }

    componentDidMount() {
        this.getWorktimes();
    }

    getWorktimes = () => {
        axios().get("worktimes/").then(response => {
            const fetchedWorktimes = [];
            for (let key in response.data) {
                fetchedWorktimes.push({
                    ...response.data[key]
                });
            }
            this.setState({
                worktimes: [...fetchedWorktimes],
                filteredWorktimes: null
            })
        }).catch(function (error) {
            this.setState({
                serverError: true
            })
        });
    }


    handleDelete = () => {
        if (this.state.selectedWorktime) {
            axios().delete("worktimes/" + this.state.selectedWorktime.id)
                .then(() => {
                    this.getWorktimes();
                    this.setState({
                        showDeleteQuestion: false,
                        selectedWorktime: null,
                        successDelete: true,

                    })
                }).catch((error) => {
                    if (error.response.status === 400) {
                        this.setState({
                            showDeleteQuestion: false,
                            selectedWorktime: null,
                            serverError: true,
                            deleteErrorText: "Nem létezik ilyen azonosítójú beosztás!"
                        })
                    } else {
                        this.setState({
                            showDeleteQuestion: false,
                            selectedWorktime: null,
                            serverError: true,
                            deleteErrorText: "Ismeretlen szerverhiba!"
                        })
                    }
                });
        }
    }

    filterHandler = (event) => {
        event.preventDefault();
        var foundedWorktimes = [];
        this.state.worktimes.map((worktime) => {
            let name = (worktime.user.familyname + " " + worktime.user.givenname).toLowerCase();
            if (name.includes((event.target.value).toLowerCase())) {
                foundedWorktimes.push(worktime);
            }
            return worktime;
        });

        this.setState({
            filteredWorktimes: [...foundedWorktimes]
        })

        /*console.log(foundedWorktimes, "founded");
        console.log(this.state.filteredWorktimes, "filtered");*/
    }

    FilterClearHandler = () => {
        if (!!this.searchRef) {
            this.searchRef.value = "";
            this.setState({
                filteredWorktimes: null
            })

        }
    };

    render() {
        return (
            <>
                <div className={"mx-5"}>
                    <div className="row my-3 align-items-center">
                        <div className="col-12 col-md-4">
                            <Link to={"/worktimes/new"} className={"btn btn-primary"} >
                                + Új beosztás felvétele
                            </Link>
                        </div>
                        <div className="col-12 filter-list col-md-4 offset-md-4">
                            <form className={"d-flex w-100"}>
                                <fieldset className="form-group mb-0 w-100">
                                    <input type="text"
                                        className="form-control"
                                        ref={(elementRef) => this.searchRef = elementRef}
                                        placeholder="Keresés" onChange={this.filterHandler} />
                                </fieldset>
                                {
                                    this.state.filteredWorktimes ?
                                        <div className={"btn btn-danger"} onClick={() => this.FilterClearHandler()}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </div> : null
                                }
                            </form>
                        </div>
                    </div>
                    <ul className="list-group">
                        <li className="list-group-item d-none d-md-block">
                            <div className="row">
                                <div className="col-12 col-md-2">
                                    <b>
                                        Dolgozó
                                    </b>
                                </div>
                                <div className="col-12 col-md-2">
                                    <b>
                                        Dátum
                                    </b>
                                </div>
                                <div className="col-12 col-md-2 ">
                                    <b>
                                        Műszak kezdés
                                    </b>
                                </div>
                                <div className="col-12 col-md-3">
                                    <b>
                                        Műszak vége
                                    </b>
                                </div>
                                <div className="col-12 col-md-1  ">
                                    <b>
                                        Művelet
                                    </b>
                                </div>
                            </div>
                        </li>
                        {!!this.state.filteredWorktimes ? this.state.filteredWorktimes.map(worktime => (
                            <Worktime
                                key={worktime.id}
                                id={worktime.id}
                                date={worktime.date}
                                user={worktime.user}
                                startHour={worktime.startHour}
                                endHour={worktime.endHour}
                                showDeleteQuestion={() => this.setState({
                                    showDeleteQuestion: true,
                                    selectedWorktime: worktime
                                })}
                            />
                        )) : this.state.worktimes.map(worktime => (
                            <Worktime
                                key={worktime.id}
                                id={worktime.id}
                                date={worktime.date}
                                user={worktime.user}
                                startHour={worktime.startHour}
                                endHour={worktime.endHour}
                                showDeleteQuestion={() => this.setState({
                                    showDeleteQuestion: true,
                                    selectedWorktime: worktime
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
                        selectedWorktime: null
                    })}
                    btnSize="sm" >
                    {
                        !!this.state.selectedWorktime ? <div>
                            Biztos törli a beosztásból?
                                </div> : null
                    }
                </SweetAlert>
            </>
        );
    }

}

export default Worktimes;