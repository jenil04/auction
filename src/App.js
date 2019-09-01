import React, { Component } from "react";
import web3 from "./web3";
import auction from "./auction";

// Styling
import { Layout } from "./Layout";
import "./App.css";
import Typist from 'react-typist';

class App extends Component {
    state = {
      bids: [],
      bidders: [],
      seller: "",
      auctionValue: "",
      highestBidder: "",
      value: "",
      message: ""
    };


  async componentDidMount() {
    const bids = await auction.methods.getBids().call();
    const seller = await auction.methods.seller().call();
    const highestBidder = await auction.methods.getHighestBidder().call();
    const bidders = await auction.methods.getBidders().call();
    const auctionValue = await web3.eth.getBalance(auction.options.address);

    this.setState({
      bids,
      seller,
      highestBidder,
      bidders,
      auctionValue
    });
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({
      message: "Confirming transaction..."
    });

    await auction.methods.submitBid().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });

    this.setState({
      message: "You have been entered into the auction!"
    });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Awaiting transaction success...' })

    await auction.methods.determineWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked!' });
  };

  render() {
    return (
      <React.Fragment>
        <Layout>
          <div className="text-center">
              <Typist> <span className="text-white justify-center text-center" > Decentralized Auction on Ethereum.</span></Typist>
                <hr/>

                <form onSubmit={this.onSubmit} >
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
