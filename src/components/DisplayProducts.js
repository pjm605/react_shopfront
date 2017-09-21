import React, { Component } from 'react'

class DisplayProducts extends Component
{
	constructor (props) {
		super(props)
	}
	
	render () {
		const products = this.props.products.map(function (product) {
			return (
				<tr className="collection" key={product.args.index}>
					<td>{product.args.productId}</td>
					<td>{product.args.index}</td>
					<td>{product.args.productName}</td>
					<td>{product.args.productPrice}</td>
					<td>{product.args.productStock}</td>
				</tr>
			)
		})

		return (
			<div className="row">
		        <div className="panel panel-default">
		        	<div className="panel panel-default">
		        		<table className="table table-striped table-bordered">
		        			  <thead>
				                <tr>
				                  <th> Product ID</th>
					              <th> Product Index</th>
					              <th> Product Name</th>
					              <th> Product Price</th>
					              <th> Product Stock</th>
				                </tr>
				              </thead>
				              <tbody>
				              	{products}
				              </tbody>
		        		</table>
		        	</div>
		        </div>
		    </div>
		)
	}
}

export default DisplayProducts