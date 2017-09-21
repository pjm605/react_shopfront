import React, { Component } from 'react'

class AddProduct extends Component
{
	constructor (props) {
		super(props)
		this.state = {
			newProductId: "",
			newProductName: "",
			newProductPrice: "",
			newProductStock: ""
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleInputChange (event) {
		const name = event.target.name;
		this.setState({
			[name]: event.target.value
		});

	}

	handleSubmit (event) {
		event.preventDefault();

		const newProduct = {
			productId: parseInt(this.state.newProductId),
			productName: this.state.newProductName,
			productPrice: parseInt(this.state.newProductPrice),
			productStock: parseInt(this.state.newProductStock)
		}

		this.props.addProduct(newProduct);
	}


	
	render () {
		return (
			<div className="row">
		        <div className="col-md-12">
		          <h3>Add product</h3>
		          <form onSubmit={this.handleSubmit}>
		            Product Id: <input name="newProductId" value={this.state.newProductId} onChange={this.handleInputChange} required/>
		            Product Name: <input name="newProductName" value={this.state.newProductName} onChange={this.handleInputChange}  required/>
		            Product Price: <input name="newProductPrice" value={this.state.newProductPrice} onChange={this.handleInputChange} required/>
		            Product Stock: <input  name="newProductStock" value={this.state.newProductStock} onChange={this.handleInputChange} required/>
		            <button type="submit" className="btn btn-primary"> Add Product </button>
		          </form>
		        </div>
		    </div>
		)
	}
}

export default AddProduct