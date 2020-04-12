import React, { Component } from 'react';
import axios from '../../../axios-products';


class ProductForm extends Component {


    state = {
        name: "",
        sale_price: "",
        sale: false,
        price: "",
        category: null,
        categories: [],
        //validation
        nameError: false,
        priceError: false,
        categoryError: false
    };

    componentDidMount() {
        if (!!this.props.product) {
            console.log(this.props.product);
            this.setState({
                name: this.props.product.name,
                sale_price: this.props.product.salePrice,
                sale: this.props.product.sale,
                price: this.props.product.price,
                category: this.props.product.category.id
            })
        }
        this.getCategories();
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
        if (this.state.name === "") {
            this.setState({
                nameError: true,
            });
            return
        } else {
            this.setState({
                nameError: false,
            })
        }



        const sendParams = {
            sale: this.state.sale,
            name: this.state.name,
            price: this.state.price,
            categoryId: this.state.category,
            salePrice: this.state.sale_price === "" ? 0 : this.state.sale_price
        };
        console.log(sendParams);
        this.props.save(sendParams)
    }



    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="name">Név</label>
                    <input type="text"
                        className={`form-control ${this.state.nameError ? "invalid" : ""}`}
                        id="name"
                        onChange={(e) => this.setState({
                            name: e.target.value
                        })}
                        value={this.state.name}
                    />
                    {
                        this.state.nameError ? <div className="invalid-feedback  d-block">
                            Terméknév megadása kötelező!
                            </div> : null
                    }
                    <small className="form-text text-muted">A név nem lehet azonos a rendszerben megtalálhatókkal</small>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Ár</label>
                    <input type="number" className="form-control" id="price" onChange={(e) => this.setState({
                        price: e.target.value
                    })}
                        value={this.state.price}
                    />
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="sale" onChange={() => this.setState({
                        sale: !this.state.sale
                    })}
                        checked={this.state.sale}
                    />
                    <label className="form-check-label" htmlFor="sale">Akciós</label>
                </div>
                <div className="form-group">
                    <label htmlFor="sale_price">Akció mértéke</label>
                    <input
                        type="number"
                        className="form-control"
                        id="sale_price"
                        onChange={(e) => this.setState({
                            sale_price: e.target.value
                        })}
                        value={this.state.sale_price}
                    />
                </div>

                {/* TODO: név, categória, ár kötelező! */}
                {/* TODO: ha nincs akciós ár ne mutassa hogy KG */}
                <div className="form-group">
                    <label>Kategória</label>
                    <select
                        className="form-control mb-3"
                        onChange={(e) => this.setState({
                            category: e.target.value
                        })}
                    >
                        <option value="" >Válasszon kategóriát</option>

                        {this.state.categories.map(category => (
                            <option
                                value={category.id}
                                key={category.id}
                                selected={!!this.state.category && this.state.category === category.id ? "selected" : ""}
                            >{category.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Mentés</button>
            </form>
        )
    }

}

export default ProductForm;