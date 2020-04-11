import React, { Component } from 'react';

class CategoryForm extends Component {

    state = {
        name: "",
        sale_price: "",
        sale: false,
    };

    componentDidMount() {
        if(!!this.props.category ){
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
        const sendParams = {
            sale: this.state.sale,
            name: this.state.name,                 
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
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="sale" onChange={() => this.setState({
                        sale: !this.state.sale
                    })}sale
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

                <button type="submit" className="btn btn-primary">Mentés</button>
            </form>
        )
    }
}

export default CategoryForm;