import React, { Component } from 'react';
import axios from '../../axios-products';
import Income from './Income/Income';

class Incomes extends Component {
    state = {
        incomes: [],
        loading: true
    }

    componentDidMount() {
        axios.get("incomes/", {
            withCredentials: true,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }

        }).then(response => {
            console.log(response);
            const fetchedIncomes = [];
            for (let key in response.data) {
                fetchedIncomes.push({
                    ...response.data[key]
                });
            }
            this.setState({ incomes: fetchedIncomes, loading: false })
        }).catch(function (error) {
            console.log('Error on stocks');
        });
    }

    render() {
        return (
            <div>
                {this.state.incomes.map(income => (
                    <Income
                        key={income.id}
                        id={income.id}
                        seller={income.seller}
                        date={income.date}
                        price={income.price}
                        quantity={income.quantity}
                        product={income.product}
                    />
                ))}
            </div>
        );
    }

}

export default Incomes;