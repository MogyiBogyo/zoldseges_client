import React, { Component } from 'react'
import Product from './Product/Product';
import axios from '../../axios-products';

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
                fetchedCategories.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({ categories: fetchedProducts, loading: false })
        }).catch(function (error) {
            console.log('Error products');
        });

    }

    render() {
        return (
            <div>
                 {this.state.products.map(product => (
                    <Product
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        category={product.category}
                        ár={product.price}
                        isSale={product.sale}
                        salePrice={product.salePrice}
                    />
                ))}
            </div>
        );
    }

}

export default Products;