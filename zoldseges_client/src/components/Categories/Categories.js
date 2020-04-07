import React, { Component } from 'react';
import axios from '../../axios-products';
import Category from './Category/Category';
import classes from './Categories.module.css';


class Categories extends Component {

    state = {
        /* categories: [
            { id: 1, is_sale: false, name: "zöldség", sale_price: 200 },
            { id: 2, is_sale: false, name: "gyümölcs", sale_price: 200 },
            { id: 3, is_sale: false, name: "magvak", sale_price: 200 }
        ] */
        categories: [],
        loading: true
    }

    componentDidMount() {

        axios.get("categories/", {
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
            const fetchedCategories = [];
            for (let key in response.data) {
                fetchedCategories.push({
                    ...response.data[key],
                    //id: key
                });
            }
            this.setState({ categories: fetchedCategories, loading: false })
        }).catch(function (error) {
            console.log('Error akarmi');
        });
    }

    render() {
        /* let categories = this.state.categories.map((item, key) =>
            <li key={item.id}>{item.name}</li>); */

        return (
            <div className={classes.CategorySummary}> 
                {this.state.categories.map(category => (
                    <Category
                        key={category.id}
                        id={category.id}
                        name={category.name}
                        isSale={category.sale}
                        salePrice={category.salePrice}
                    />
                ))}
            </div>
        );

    }

}

export default Categories;


