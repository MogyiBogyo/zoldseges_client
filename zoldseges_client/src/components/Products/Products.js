import React, { Component } from 'react'
import Product from './Product/Product';
import axios from '../../axios-products';
import classes from './Products.module.css';


class Products extends Component {
    state = {
        products: [],
        loading: true
    }

    componentDidMount() {
        axios.get("products/", {
            auth: {
                username: "Pistike",
                password: "password"
            }
        }, {
            withCredentials: true,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }

        }).then(response => {
            console.log(response);
            const fetchedProducts = [];
            for (let key in response.data) {
                fetchedProducts.push({
                    ...response.data[key],
                    //id: key
                });
            }
            this.setState({ products: fetchedProducts, loading: false })
        }).catch(function (error) {
            console.log('Error products');
        });

    }



    render() {
        /* let products = this.state.products.map((item, key) =>
            <li key={item.id}>{item.name}</li>); */

        return (
            <div className={classes.ProductSummary}>
                 {this.state.products.map(product => (
                    <Product
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        category={product.category}
                        price={product.price}
                        isSale={product.isSale}
                        salePrice={product.salePrice}
                    />
                ))}
            </div>
        );
    }

}

export default Products;