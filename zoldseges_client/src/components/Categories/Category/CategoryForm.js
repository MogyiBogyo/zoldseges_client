import React, { Component } from 'react';

class CategoryForm extends Component {

    state = {
        name: "",
        sale_price: null,
        sale: false,
        nameError: false,
        salePriceError: false,
        saveError: false
    };

    componentDidMount() {
        if (!!this.props.category) {
            console.log(this.props.category);
            this.setState({
                name: this.props.category.name,
                sale_price: this.props.category.salePrice,
                sale: this.props.category.sale
            })
        }
    }



    handleSubmit = (event) => {
        event.preventDefault();
        // TODO: check required field is correct
       if (this.state.name === "" || this.state.name.length < 3 || this.state.name.length > 20) {
            this.setState({
                nameError: true,
            });
            return
        } else {
            this.setState({
                nameError: false,
            })
        }
        
        if (typeof parseInt(this.state.sale_price) == "number" && this.state.sale_price !== "") {
            this.setState({
                salePriceError: false,
            });
            
        } else if(this.state.sale_price === ""){
            this.setState({
                salePriceError: false
            });
        } 
        else {
            this.setState({
                salePriceError: true,
            });
            return
        }


        console.log(this.state.nameError);
        if (!this.state.nameError && !this.state.salePriceError) {
            const sendParams = {
                sale: this.state.sale,
                name: this.state.name.toString(),
                salePrice: this.state.sale_price === "" ? 0 : parseInt(this.state.sale_price)
            };
            this.props.save(sendParams)
        }


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
                            name: e.target.value.trim()
                        })}
                        value={this.state.name}
                    />
                    {
                        this.state.nameError ? <div className="invalid-feedback  d-block">
                            Kategórianév megadása kötelező, 3-20 karakter hosszúnak kell lennie!
                            </div> : null
                    }
                    <small className="form-text text-muted">A név nem lehet azonos a rendszerben megtalálhatókkal</small>
                </div>
                <div className="form-check">
                    <input type="checkbox"
                        className="form-check-input"
                        id="sale"
                        onChange={() => this.setState({
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
                        className={`form-control ${this.state.salePriceError ? "invalid" : ""}`}
                        id="sale_price"

                        onChange={(e) => this.setState({
                            sale_price: e.target.value
                        })}
                        value={this.state.sale_price}
                    />
                </div>
                {
                    this.state.salePriceError ? <div className="invalid-feedback d-block mb-3">
                        Akciós árnak számot kell megadni!
                            </div> : null
                }

                <button type="submit" className="btn btn-primary">Mentés</button>
            </form>
        )
    }
}

export default CategoryForm;