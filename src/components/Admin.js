import React, { Component } from 'react'
import AddProduct from "./AddProduct.js";
import DisplayProducts from "./DisplayProducts.js";

class ChangeAdmin extends Component
{
	constructor (props) {
		super(props)
		this.onChangeAdmin = this.onChangeAdmin.bind(this)
	}

	getAccounts() {
		var accounts = this.props.accounts.map(account => {
			return (
				<option key={account}>
					{account}
				</option>
			)
		});

		return accounts;
	}

	onChangeAdmin(event) {
		this.props.changeAdmin(event.target.value);
	}

	render () {
		var accounts;

		if (this.props.accounts) {
			accounts = this.getAccounts();
		}

		let onlyAdmin = this.props.administrator === this.props.currentAccount ? ( 
			<div>
				<h3>Change Administrator</h3> 
				<select id="newAdminInput" onChange={this.onChangeAdmin}>
					{accounts}
				</select>
				<AddProduct addProduct={this.props.addProduct} />
			</div>

		) : (<div> This page is only for administrator </div>)

		return (
		<div>
			<div className="row">
				<h2>Admin Page</h2>
				<div className="col-md-12">
					<div>
						<p>Current Account: {this.props.currentAccount}</p> 
						<p>Current Admin: {this.props.administrator}</p>
					</div>
				</div>
			</div>
			<DisplayProducts
	               	products={this.props.products} />
			<div className="row">
				{onlyAdmin}
			</div>
		</div>
		)
	}
}

export default ChangeAdmin