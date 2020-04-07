import React, { Component } from 'react';
import axios from '../../axios-products';
import Sale from './Sale/Sale';


class Sales extends Component {

    state = {
        sales: [],
        loading: false
    }

    componentDidMount() {
        axios.get("sales/", {
            withCredentials: true,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }

        }).then(response => {
            console.log(response);
            const fetchedSales = [];
            for (let key in response.data) {
                fetchedSales.push({
                    ...response.data[key]
                });
            }
            this.setState({ sales: fetchedSales, loading: false })
        }).catch(function (error) {
            console.log('Error on sales');
        });
    }


    render() {
        return (
            <div>
                {this.state.sales.map(sale => (
                    <Sale
                        key={sale.id}
                        id={sale.id}
                        date={sale.date}
                        buyer={sale.buyer}
                        price={sale.price}
                        quantity={sale.quantity}
                        product={sale.product}
                        
                    />
                ))}
            </div>
        );
    }
}

export default Sales;
