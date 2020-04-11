import React, { Component } from 'react';
import axios from '../../../axios-products';


class ProductForm extends Component {


    state = {
        name: "",
        sale_price: "",
        sale: false,
        price: "",
        category: null,
        categories: []
    };

    componentDidMount() {
        if (!!this.props.product) {
            console.log(this.props.product);
            this.setState({
                name: this.props.product.name,
                sale_price: this.props.product.salePrice,
                sale: this.props.product.sale,
                price: this.props.product.price,
                category: this.props.product.category
            })
        }
    }

    getCategories = () => {
        axios.get("/categories")
            .then(response => {
                const fetchedCategories = [];
                for (let key in response.data) {
                    fetchedCategories.push({
                        ...response.data[key]
                    });
                }
                this.setState({
                    categories: fetchedCategories
                });
            }).catch(function (error) {
                this.setState({
                    serverError: true
                })
            });
    }


    handleSubmit = (event) => {
        event.preventDefault();
        // TODO: check required field is correct
        const sendParams = {
            sale: this.state.sale,
            name: this.state.name,
            price: this.state.price,
            category: this.state.category,
            salePrice: this.state.sale_price === "" ? 0 : this.state.sale_price
        };
        this.props.save(sendParams)
    }



    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="name">Név</label>
                    <input type="text" className="form-control" id="name" onChange={(e) => this.setState({
                        name: e.target.value
                    })}
                        value={this.state.name}
                    />
                    <small className="form-text text-muted">A név nem lehet azonos a rendszerben megtalálhatókkal</small>
                </div>
                <div className="form-group">
                    <label for="price">Ár</label>
                    <input type="text" className="form-control" id="price" onChange={(e) => this.setState({
                        price: e.target.value
                    })}
                        value={this.state.name}
                    />
                    <small className="form-text text-muted">A név nem lehet azonos a rendszerben megtalálhatókkal</small>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="sale" onChange={() => this.setState({
                        sale: !this.state.sale
                    })} sale
                        checked={this.state.sale}
                    />
                    <label className="form-check-label" for="sale">Akciós</label>
                </div>
                <div className="form-group">
                    <label for="sale_price">Akció mértéke</label>
                    <input
                        type="text"
                        className="form-control"
                        id="sale_price"
                        disabled={!this.state.sale}
                        onChange={(e) => this.setState({
                            sale_price: e.target.value
                        })}
                        value={this.state.sale_price}
                    />
                </div>
                <select class="form-control">

                    {/* TODO: map a categoriákon*/}
                    <option>Mustard</option>
                    <option>Ketchup</option>
                    <option>Barbecue</option>
                </select>


                <button type="submit" className="btn btn-primary">Mentés</button>
            </form>
        )
    }

}

export default ProductForm;