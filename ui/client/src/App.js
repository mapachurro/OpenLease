import React, { Component } from "react";
import BillOfSaleContract from "./contracts/BillOfSale.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";

import "./App.css";

class App extends Component {
  state = { seller: null, buyer: null, descr: null, price: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(BillOfSaleContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  onFundClick = async () => {
    const { contract, accounts, web3, price } = this.state;
    web3.eth.sendTransaction({
      from: accounts[0],
      to: contract.address,
      value: price
    });
  };

  onConfirmClick = async () => {
    const { contract, accounts } = this.state;
    contract.confirmReceipt({ from: accounts[0] });
  };

  runExample = async () => {
    const { contract, web3 } = this.state;

    const balance = await web3.eth.getBalance(contract.address);
    const seller = await contract.seller();
    const buyer = await contract.buyer();
    const descr = await contract.descr();
    const priceBN = await contract.price();
    const price = priceBN.toString();
    const status = await contract.confirmed();
    const statusMessage = this.setStatusMessage(
      status,
      parseInt(balance),
      price
    );
    this.setState({ balance, seller, buyer, descr, price, statusMessage });
  };

  setStatusMessage = (status, balance, price) => {
    return status
      ? "Receipt Confirmed!"
      : balance === price
      ? "Payment Made"
      : "Awaiting Payment";
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Bill of Sale</h1>
        <div>
          Agreement Status: <strong>{this.state.statusMessage}</strong>
        </div>
        <div>Contract Address: {this.state.contract.address}</div>
        <div>Contract Balance: {this.state.balance / 10 ** 18}</div>
        <div>Seller: {this.state.seller}</div>
        <div>Buyer: {this.state.buyer}</div>
        <div>Description: {this.state.descr}</div>
        <div>Price: {this.state.price / 10 ** 18} ETH</div>
        <div>
          <button onClick={() => this.onFundClick()}>Fund Contract</button>
        </div>
        <div>
          <button onClick={() => this.onConfirmClick()}>Confirm Receipt</button>
        </div>
      </div>
    );
  }
}

export default App;
