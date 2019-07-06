import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import {auctionContract} from './web3.js';
import {ShowAuction } from "./ShowAuction";

class App extends Component {
  componentWillMount() {
    this.submitBid();
    this.updateResults();
  }
  
  constructor(props){
    super(props)
    this.state={
      auction : [{name:'Jenil', bid: 1}]
    }
    this.handleBidding=this.handleBidding.bind(this)
  }

handleBidding(name, bid){
    auctionContract.submitBid(name, bid)

    let bids = auctionContract.submitBid(name, bid).toNumber()

    this.setState({auction:this.state.auction.map(
      (el)=>el.name===name? Object.assign({},el,{bid:bid}):el
    )});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Decentralized Auction</h1>
        </header>
        <p className="App-intro">
          Auction built with Ethereum and React
        </p>
        <div className="movie-table">
          <ShowAuction auction={this.state.auction} bid={this.handleBidding}/>
        </div>
      </div>
    );
  }
}

export default App;