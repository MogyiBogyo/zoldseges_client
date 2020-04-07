import React, { Component } from 'react';
import axios from '../../axios-products';
import Stock from './Stock/Stock';

class Stocks extends Component {
    state = {
        stocks: [],
        loading: true
    }


    componentDidMount() {
        axios.get("stocks/", {
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
                    ...response.data[key]
                });
            }
            this.setState({ stocks: fetchedStocks, loading: false })
        }).catch(function (error) {
            console.log('Error on stocks');
        });
    }

    render() {
        return (
            <div>
                {this.state.stocks.map(stock => (
                    <Stock
                        key={stock.id}
                        id={stock.id}
                        quantity={stock.quantity}
                        product={stock.product}
                    />
                ))}
            </div>
        );
    }
}

export default Stocks;