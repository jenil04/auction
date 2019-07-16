import React, { Component } from 'react';
import web3 from './web3';
import auction from './auction';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {bids: [], seller: "", auctionValue: "", highestBidder: "",
                  value: "", message: "", name: "", bidAmount: ""};
  }
  
  async componentDidMount() {
    const seller = await auction.methods.seller().call(); 
    const highestBidder = await auction.methods.getHighestBidder().call();
    const auctionValue = await web3.eth.getBalance('0x4098878608e26825d248f7996267B49f2d1Bd49e'); 

    this.setState({
      seller,
      highestBidder,
      auctionValue
    });
  }

  onEnter = async (event) => { 
    event.preventDefault(); 
    const accounts = await web3.eth.getAccounts();

    this.setState({
      message: 'Processing...'
    });

    await auction.methods.submitBid().send({ 
      from: accounts[0], 
      valuecd: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({
      message: 'You have been entered into the auction!'
    });
  }

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({
      message: 'Picking the highest bidder...'
    });

    await auction.methods.determineWinner().send({
      from: accounts[0]
    });

    this.setState({
      message: 'Sold, to the highest bidder!'
    });
  }

  render() {
    return (
      <div>
        <h2>Decentralized Auction</h2>
        <p>This contract is managed by {this.state.seller}</p>
        <p>There are currently {this.state.bids.length} people entered, 
        competing to buy {web3.utils.fromWei(this.state.auctionValue, 'ether')} ether! </p>
        <hr />

        <form onSubmit={this.onEnter}>
          <h4>Join in to the Auction!</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input 
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form> 
        
        <hr />
        <h4>Let's find out the highest bidder</h4>
        <button onClick={this.onClick}>Highest Bidder</button>

        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
