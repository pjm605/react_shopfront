import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import getWeb3 from './utils/getWeb3';
import * as Helpers from './utils/Helpers';


import ShopfrontContract from "../build/contracts/Shopfront.json";
import AdminContract from "../build/contracts/Admin.json";
import coBuyingJson from "../build/contracts/CoBuying.json";

import AccountInfo from "./components/AccountInfo.js";
import Admin from "./components/Admin.js";
import AddProduct from "./components/AddProduct.js";
import DisplayProducts from "./components/DisplayProducts.js";


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      accounts: [],
      currentAccount: null,
      balance: null,
      instance: null,
      products: [],
      administrator: null
    }

    this.setAccount = this.setAccount.bind(this);
    this.changeAdmin = this.changeAdmin.bind(this);
    this.addProduct = this.addProduct.bind(this);

  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract');
    const Shopfront = contract(ShopfrontContract);

    Shopfront.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.

    var ShopfrontInstance
    // Get accounts.

    this.state.web3.eth.getAccounts((error, accounts) => {
      Shopfront.deployed().then((instance) => {
        ShopfrontInstance = instance

        this.setState({
        	accounts: accounts,
        	currentAccount: accounts[0],
        	administrator: accounts[0],
        	instance: instance
        })

        this.watchProductAdded()
        this.watchNewAdmin()

        return this.state.web3.eth.getBalance(accounts[0]);
      })
      .then((balance) => {
      	return this.setState({
      		balance: balance.toString(10)
      	})
      })

    })

  }

  setAccount(account) {
  	this.state.web3.eth.getBalance(account, (err, balance) => {
  		if (err) {
  			console.log("error getting balance from setAccount function")
  		} else {
  			this.setState ({
  				currentAccount: account, 
  				balance: balance.toString(10)
  			})
  		}
  	})
  }

  changeAdmin(selectedAdmin) {
  	this.state.instance.registerAdministrator(selectedAdmin, {from: this.state.currentAccount})
  	.then(tx => {
  		console.log("new Admin", tx);
  		
  		this.setState({
  			administrator: selectedAdmin
  		})
  	})
  	.catch(err => {
  		console.log("Error processing changeAdmin", err);
  	})
  }

  addProduct(newProduct) {
  	this.state.instance.addProduct(newProduct.productId, newProduct.productName, newProduct.productPrice, newProduct.productStock, 1, {from: this.state.currentAccount, gas: 900000})
  	.then(tx => {
  		console.log("newProduct: ", tx);
  	})
  	.catch(err => {
  		console.log("Error processing addProduct: ", err);
  	})
  }


  watchProductAdded () {
  	this.state.instance.LogNewProduct({}, {fromBlock: 0})
  	.watch((err, newProduct) => {
  		if (err) {
          console.log("Error watching new product events", err);
        } else {
          console.log("New Product Added", newProduct);

          var pNameToString = Helpers.HexToAsciiHelper(newProduct.args.productName);
          newProduct.args.productId = newProduct.args.productId.toString(10);
          newProduct.args.index = newProduct.args.index.toString(10);
          newProduct.args.productName = pNameToString;
          newProduct.args.productPrice = newProduct.args.productPrice.toString(10);
          newProduct.args.productStock = newProduct.args.productStock.toString(10);
          var products = this.state.products;
          products.push(newProduct);

          this.setState({
          	products: products
          })
         
        }
  	})
  }

  watchNewAdmin () {
  	this.state.instance.LogNewAdministrator(null, { fromBlock: 0, toBlock: 'latest' })
  	.watch((err, newAdmin) => {
  		if (err) {
          console.log("Error watching new product events", err);
        } else {
          console.log("watchNewAdmin", newAdmin);
          this.setState({
          	administrator: newAdmin.args.newAdministrator
          })
         
        }
  	})
  }

  render() {
    return (
      <div className="App">
        <header>
          <nav className="navbar pure-menu pure-menu-horizontal">
              <ul>
                <li><Link to="/">Account</Link></li>
                <li><Link to="/admin">Admin</Link></li>
              </ul>
          </nav>
        </header>

        <main className="container">
      		<div className="pure-g">
        		<div className="pure-u-1-1">
               <Switch>
                  <Route 
                    exact path='/' 
                    render={(props) => <AccountInfo {...props} 
                      administrator={this.state.administrator}  
                      accounts={this.state.accounts}  
                      currentAccount={this.state.currentAccount} 
                      balance={this.state.balance} 
                      setAccount={this.setAccount} />} />
                  <Route 
                    path='/admin' 
                    render={(props) => <Admin {...props} 
                      accounts={this.state.accounts} 
                      changeAdmin={this.changeAdmin} 
                      currentAccount={this.state.currentAccount} 
                      addProduct={this.addProduct}
                      products={this.state.products}
                      administrator={this.state.administrator}/>} />
                </Switch>

        		</div>
      		</div>
    	</main>

      </div>
    );
  }
}

export default App