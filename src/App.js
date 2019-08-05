import React, { Component } from "react";
import web3 from "./web3";
import auction from "./auction";
import { Layout } from "./Layout";
import "./App.css";
import { Button } from "react-bootstrap";
import Typist from 'react-typist';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bids: [],
      bidders: [],
      seller: "",
      auctionValue: "",
      highestBidder: "",
      value: "",
      message: ""
    };
  }

  async componentDidMount() {
    const bids = await auction.methods.getBids().call();
    const seller = await auction.methods.seller().call();
    const highestBidder = await auction.methods.getHighestBidder().call();
    const bidders = await auction.methods.getBidders().call();
    const auctionValue = await web3.eth.getBalance(
      "0x8B167cf1754005F502774Ffe63857C8C66B5B9f1"
    );

    this.setState({
      bids,
      seller,
      highestBidder,
      bidders,
      auctionValue
    });
  }

  onEnter = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({
      message: "Processing..."
    });

    await auction.methods.submitBid().send({
      from: accounts[0],
      valuecd: web3.utils.toWei(this.state.value, "ether")
    });

    this.setState({
      message: "You have been entered into the auction!"
    });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({
      message: "Picking the highest bidder..."
    });

    await auction.methods.determineWinner().send({
      from: accounts[0]
    });

    this.setState({
      message: "Sold, to the highest bidder!"
    });
  };

  render() {
    return (
      <React.Fragment>
        <Layout>
          <div className="text-center">
              <Typist> <span className="text-white justify-center text-center" > Decentralized Auction on Ethereum.</span></Typist>
              <br />
                <Typist> 
                  <span className="w-full block text-white text-5xl font-fancy font-bold text-center justify-center mb-8">
                  There are currently {this.state.bidders.length} people entered,
                  competing to bid {" "}
                  {web3.utils.fromWei(this.state.auctionValue, "ether")} ether.{" "}
                  </span>
                </Typist>

                <hr/>

                <form onSubmit={this.onEnter} >
                  <h4 className="text-white justify-center" >Join the Auction: </h4>
                  <br />
                  <div>
                    <label className="text-white justify-center font-bold text-center">Bid amount: </label>
                    
                    <input
                      value={this.state.value}
                      onChange={event =>
                        this.setState({ value: event.target.value })
                      }
                    />
                    
                  </div>
                  <br />
                  <button className= "text-center">Make a bid </button>
                  <hr/>
                </form>
                <h4 className="text-white justify-center" >Reaveal the Highest Bidder: </h4>
                <br />
                <button onClick={this.onClick} className = "text-center">Highest Bidder</button>
                <h4 className="text-white justify-center">{this.state.message}</h4>
          </div>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
