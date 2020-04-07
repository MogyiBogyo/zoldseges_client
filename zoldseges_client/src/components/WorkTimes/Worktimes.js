import React, { Component } from 'react';
import axios from '../../axios-products';
import Worktime from './WorkTime/Worktime';

class Worktimes extends Component {
    state = {
        worktimes: [],
        loading: true
    }

    componentDidMount() {
        axios.get("worktimes/", {
            withCredentials: true,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }

        }).then(response => {
            console.log(response);
            const fetchedWorktimes = [];
            for (let key in response.data) {
                fetchedWorktimes.push({
                    ...response.data[key]
                });
            }
            this.setState({ worktimes: fetchedWorktimes, loading: false })
        }).catch(function (error) {
            console.log('Error on stocks');
        });
    }

    render() {
        return (
            <div>
                {this.state.worktimes.map(worktime => (
                    <Worktime
                        key={worktime.id}
                        id={worktime.id}
                        date={worktime.date}
                        user={worktime.user}
                        startHour={worktime.startHour}
                        endHour={worktime.endHour}
                    />
                ))}
            </div>
        );
    }

}

export default Worktimes;