import React, { Component } from 'react';
import axios from '../../../axios-products';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class SaleForm extends Component {

    state = {
        quantity: "",
        product: null,
        products: [],
        buyer: "",
        date: "",
        price: "",


        //validation variables
        productError: false,
        priceError: false,
        quantityerror: false,
        buyerError: false
        //dateError: false,
    };

    componentDidMount() {
        //console.log(this.state.date);
        if (!!this.props.sale) {
            this.setState({
                quantity: this.props.sale.quantity,
                product: this.props.sale.product.id,
                buyer: !!this.props.sale.buyer ? this.props.sale.buyer : "",
                date: this.props.sale.date,
                price: this.props.sale.price
            })
        }
        this.getProducts();
    }



    getProducts = () => {
        axios().get("products/")
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


    setStartDate = (date) => {
        this.setState({
            date: date
        })
    }


    handleSubmit = (event) => {
        event.preventDefault();
        // validate

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

        if (this.state.quantity === "" || this.state.quantity === 0) {
            this.setState({
                quantityerror: true,
            });
            return
        } else {
            this.setState({
                quantityerror: false,
            })
        }
        if (this.state.price === "") {
            this.setState({
                priceError: true,
            });
            return
        } else {
            this.setState({
                priceError: false,
            })
        }
        if (this.state.date === "") {
            this.setState({
                dateError: true,
            });
            return
        } else {
            this.setState({
                dateError: false,
            })
        }
        if (this.state.buyer.length > 25) {
            this.setState({
                buyerError: true,
            });
            return
        } else {
            this.setState({
                buyerError: false,
            })
        }

        const sendParams = {
            quantity: this.state.quantity,
            productId: this.state.product,
            date: this.state.date,
            buyer: !!this.state.buyer ? this.state.buyer : "",
            price: this.state.price
        };

        this.props.save(sendParams)
    }
    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label>Termék</label>
                    <select
                        className={`form-control ${this.state.productError ? "invalid" : ""} `}
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
                    this.state.productError ?
                        <div className="invalid-feedback d-block">
                            Termék választása kötelező!</div>
                        : null
                }


                <div className="form-group">
                    <label htmlFor="quantity">Mennyiség</label>
                    <input type="number"
                        className={`form-control ${this.state.quantityerror ? "invalid" : ""}`}
                        id="quantity"
                        onChange={(e) => this.setState({
                            quantity: e.target.value
                        })}
                        value={this.state.quantity}
                    />
                </div>
                {
                    this.state.quantityerror ? <div className="invalid-feedback d-block mb-3">
                        Mennyiséget kötelező megadni!
                            </div> : null
                }

                <div className="form-group">
                    <label htmlFor="price">Ár</label>
                    <input type="number"
                        className={`form-control ${this.state.priceError ? "invalid" : ""}`}
                        id="price"
                        onChange={(e) => this.setState({
                            price: e.target.value
                        })}
                        value={this.state.price}

                    />
                </div>
                {
                    this.state.priceError ? <div className="invalid-feedback d-block mb-3">
                        Árat kötelező megadni!
                            </div> : null
                }


                <div className="form-group">
                    <label htmlFor="buyer">Vevő</label>
                    <input type="text"
                        className={`form-control ${this.state.buyerError ? "invalid" : ""}`}
                        id="buyer"
                        onChange={(e) => this.setState({
                            buyer: e.target.value
                        })}
                        value={this.state.buyer}
                    />
                </div>
                {
                    this.state.buyerError ? <div className="invalid-feedback d-block mb-3">
                        A vevő neve nem lehet 25 karakternél hoszabb!
                            </div> : null
                }

                <div className="form-group">
                    <div><label htmlFor="date">Dátum</label></div>
                    <DatePicker
                        showPopperArrow={false}
                        selected=""
                        onChange={(date) => this.setStartDate(date)}
                        value={this.state.date}
                        dateFormat={"yy-mm-dd"}
                    />
                </div>
                {
                    this.state.dateError ? <div className="invalid-feedback d-block mb-3">
                        Dátum megadása kötelező megadni!
                            </div> : null
                }

                <button type="submit" className="btn btn-primary">Mentés</button>
            </form >
        );
    }
}

export default SaleForm;