import React, { Component } from 'react';
import axios from '../../axios-products';
import Worktime from './WorkTime/Worktime';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

class Worktimes extends Component {
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
        var found = "";

        found = this.state.worktimes.map((worktime) => {
            let name = worktime.user.familyname + " " + worktime.user.givenname;
            if (name.includes(event.target.value)) {
                foundedWorktimes.push(worktime);
            }
        });

        this.setState({
        })

        /*console.log(foundedWorktimes, "founded");
        console.log(this.state.filteredWorktimes, "filtered");*/
    }

    render() {
        return (
            <>
                <div className={"mx-5"}>
                    <div className="row my-3">
                        <div className="col-md-5">
                            <Link to={"/worktimes/new"} className={"btn btn-primary"} >
                                + Új beosztás felvétele
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