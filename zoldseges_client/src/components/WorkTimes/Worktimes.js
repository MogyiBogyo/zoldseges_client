import React, { Component } from 'react';
import axios from '../../axios-products';
import Worktime from './WorkTime/Worktime';

class Worktimes extends Component {
    state = {
        worktimes: [],
        loading: true
    }

    componentDidMount() {
        axios().get("worktimes/").then(response => {
            const fetchedWorktimes = [];
            for (let key in response.data) {
                fetchedWorktimes.push({
                    ...response.data[key]
                });
            }
            this.setState({ worktimes: fetchedWorktimes, loading: false })
        }).catch(function (error) {
            console.log('Error on worktimes');
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