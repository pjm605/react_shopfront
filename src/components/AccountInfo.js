
import React, { Component } from 'react'

class AccountInfo extends Component
{
	constructor (props) {
		super(props)
		this.onChangeAccount = this.onChangeAccount.bind(this)
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

	onChangeAccount(event) {
		this.props.setAccount(event.target.value);
	}

	render () {
		var accounts;

		if (this.props.accounts) {
			accounts = this.getAccounts();
		}

		return (
			<div className="row">
				<h3>AccountInfo Page</h3>
				<div className="col-md-12">
					<div>
						<p>Current Account: {this.props.currentAccount} current balance: {this.props.balance}</p> 
						<p>Curent Admin: {this.props.administrator} </p>
					</div>
					<h4>Change Account</h4>
					<select id="newAccountInput" onChange={this.onChangeAccount}>
						{accounts}
					</select>
				</div>
			</div>

		)
	}
}

export default AccountInfo
