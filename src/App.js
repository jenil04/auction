import React, { Component } from 'react';
import web3 from './web3';
import auction from './auction';
import auctionContract from './truffle/contracts/auction.sol';

class App extends Component {
  state = {bids: "", latestBidder: "", latestBid: "", seller: "", highestBidder: "", firstBid: "", balance: "", bidValue: "", auctionValue: ""};

  async componentDidMount() {
    const bids = await auction.methods.bids().call();
    const latestBid = await auction.methods.latestBid().call();
    const latestBidder = await auction.methods.latestBidder().call();
    const highestBidder = await auction.methods.highestBidder().call();
    const seller = await auction.methods.seller().call();
    const firstBid = await auction.methods.firstBid().call();
    const balance = await web3.eth.getBalance(auction.options.address);
    
    this.setState({bids, latestBid, latestBidder, highestBidder, firstBid, seller, balance }); 
  }
    
    onAuctionSubmit = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await auction.methods.auction(this.state.auctionValue).send({
        from: accounts[0]
      });
      this.setState({ seller: accounts[0] });
  }

    onBidSubmit = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      const weiAmount = web3.utils.toWei(this.state.bidValue, "ether");
      await auction.methods.submitBid().send({
        from: accounts[0],
        value: weiAmount 
    });
    this.setState({ latestBid: weiAmount, balance: weiAmount, latestBidder: accounts[0] });
  }
    
    render() {
      return (
    <div>
        <h2>Auction Contract</h2>
        <p>The seller is {this.state.seller}.</p>
        <p>The lattest bidder is {this.state.latestBidder}.</p>
        <p>The lattest bid is {web3.utils.fromWei(this.state.latestBid, "ether")} ether.</p>
        <p>The balance in the contract is {web3.utils.fromWei(this.state.balance, "ether")} ether.</p>
        <hr />
        <h4>Auction by seller</h4>
    <div>
    
    <label>Auction limit</label>
    
    <input
        value={this.state.auctionValue}
        onChange={event => this.setState({ auctionValue: event.target.value })}
    />

    </div>  
    <button onClick={this.onAuctionSubmit}>Auction</button> 
    <hr />
    <h4>Bidding Form</h4>
    <div>
    <label>Bidding amount</label>
    <input
    value={this.state.bidValue}
    onChange={event => this.setState({ bidValue: event.target.value })}
    />
    
    </div>
    <button onClick={this.onBidSubmit}>Bid</button>
    <hr />
    </div>
    ); 
  }
}
export default App;
