import React, { Component } from 'react';
import axios from '../../axios-products';
import Income from './Income/Income';

class Incomes extends Component {
    state= {
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
            const fetchedStocks = [];
            for (let key in response.data) {
                fetchedStocks.push({
                    ...response.data[key],
                    //id: key
                });
            }
            this.setState({ stocks: fetchedStocks, loading: false })
        }).catch(function (error) {
            console.log('Error on stocks');
        });
    }

}

export default Incomes;