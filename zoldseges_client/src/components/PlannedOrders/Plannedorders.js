import React, { Component } from 'react';
import axios from '../../axios-products';
import Plannedorder from './PlannedOrder/Plannedorder';

class Plannedorders extends Component {
    state = {
        plannedorders: [],
        loading: true
    }

    componentDidMount() {
        axios.get("plans/", {
            withCredentials: true,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }

        }).then(response => {
            console.log(response);
            const fetchedPlans = [];
            for (let key in response.data) {
                fetchedPlans.push({
                    ...response.data[key]
                });
            }
            this.setState({ plannedorders: fetchedPlans, loading: false })
        }).catch(function (error) {
            console.log('Error on planned orders');
        });
    }

    render() {
        return (
            <div>
                {this.state.plannedorders.map(plan => (
                    <Plannedorder
                        key={plan.id}
                        id={plan.id}
                        product={plan.product}
                        quantity={plan.quantity}                        
                    />
                ))}
            </div>
        );
    }

}

export default Plannedorders;