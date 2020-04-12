import React, { Component } from 'react';
import axios from '../../../axios-products';

class StockForm extends Component {
    state = {
        quantity: "",
        product: null,
        products: [],
        //validation
        productError: false,
        quantityerror: false,

    };

    componentDidMount() {
        if (!!this.props.stock) {
            console.log(this.props.stock);
            this.setState({
                quantity: this.props.stock.quantity,
                product: this.props.stock.product.id
            })
        }
        this.getProducts();
    }


    getProducts = () => {
        axios.get("products/")
            .then(response => {
                //console.log(response);
                const fetchedProducts = [];
                for (let key in response.data) {
                    fetchedProducts.push({
                        ...response.data[key]
                    });
                }
                this.setState({
                    products: fetchedProducts,
                    loading: false
                })
            }).catch(function (error) {
                this.setState({
                    serverError: true
                })
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // TODO: check required field is correct
        if (this.state.quantity === "") {
            this.setState({
                quantityerror: true,
            });
            return
        } else {
            this.setState({
                quantityerror: false,
            })
        }

        if (this.state.product === null) {
            this.setState({
                productError: true,
            });
            return
        } else {
            this.setState({
                productError: false,
            })
        }


        const sendParams = {
            quantity: this.state.quantity,
            productId: this.state.product
        };
        console.log(sendParams);
        this.props.save(sendParams)
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <div className="form-group">
                    <label>Termék</label>
                    <select
                        className={`form-control ${this.state.nameError ? "invalid" : ""} `}
                        onChange={(e) => this.setState({
                            product: e.target.value
                        })} >
                        <option value=""  >Válasszon terméket</option>
                        {this.state.products.map(product => (
                            <option
                                value={product.id}
                                key={product.id}
                                selected={!!this.state.product && this.state.product === product.id ? "selected" : ""}
                            >{product.name}</option>
                        ))}
                    </select>
                </div>
                {
                        this.state.productError ? <div className="invalid-feedback  d-block">
                            Termék választása kötelező!
                            </div> : null
                    }
                <div className="form-group">
                    <label htmlFor="quantity">Mennyiség</label>
                    <input type="number" className="form-control" id="quantity" onChange={(e) => this.setState({
                        quantity: e.target.value
                    })}
                        value={this.state.quantity}
                    />
                </div>
                {
                    this.state.quantityerror ? <div className="invalid-feedback d-block mb-3">
                        Mennyiségnek számot kell megadni!
                            </div> : null
                }

                <button type="submit" className="btn btn-primary">Mentés</button>
            </form>
        )
    }

}

export default StockForm;
