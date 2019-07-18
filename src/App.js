import React, { Component } from "react";
import web3 from "./web3";
import auction from "./auction";
import Particles from "react-particles-js";
import { Layout } from "./Layout";
import "./App.css";
import { Button } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      i: 0,
      maintxt: "Decentralized Auction on the Ethereum Blockchain",
      speed: 100,
      displaytxt: "",
      tmpTitle: "Calculating number of active users",
      fullTitle: "There are currently {`this.state.bids.length`} ",
      j: 0,
      bids: [],
      seller: "",
      auctionValue: "",
      highestBidder: "",
      value: "",
      message: "",
      name: "",
      bidAmount: ""
    };
  }

  async componentDidMount() {
    this.timeout = setInterval(() => {
      if (this.state.i < this.state.maintxt.length) {
        let newI = this.state.i + 1;
        this.setState({ i: newI });
      }
    }, 80);
    this.timeout = setInterval(() => {
      if (this.state.j < this.state.tmpTitle.length) {
        let newJ = this.state.j + 1;
        this.setState({ j: newJ });
      }
    }, 200);

    const seller = await auction.methods.seller().call();
    const highestBidder = await auction.methods.getHighestBidder().call();
    const auctionValue = await web3.eth.getBalance(
      "0x4098878608e26825d248f7996267B49f2d1Bd49e"
    );

    this.setState({
      seller,
      highestBidder,
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
    let displaytext = this.state.maintxt.substring(0, this.state.i);
    let displayTitle = "";
    if (this.state.j >= this.state.tmpTitle.length) {
      displayTitle = this.state.fullTitle;
    } else {
      displayTitle = this.state.tmpTitle.substring(0, this.state.j);
    }
    return (
      <React.Fragment>
        <Layout>
          <Particles
            className="bg-cover-image fixed w-screen h-screen z-n1"
            params={{
              particles: {
                number: {
                  value: 50
                },
                size: {
                  value: 3
                }
              },
              interactivity: {
                events: {
                  onhover: {
                    enable: true,
                    mode: "repulse"
                  }
                }
              }
            }} 
          >
            {" "}
          </Particles>
          <div class="justify-center">
              <h1 class="text-white justify-center text-center" >{displaytext}</h1>
                <h5 class="w-full block text-white text-5xl font-fancy font-bold text-center justify-center mb-8">
                  There are currently {this.state.bids.length} people entered,
                  competing to buy{" "}
                  {web3.utils.fromWei(this.state.auctionValue, "ether")} ether{" "}
                </h5>
                <form onSubmit={this.onEnter} >
                  <h4 class="text-white justify-center" >Join the Auction</h4>
                  <div>
                    <label class="text-white justify-center font-bold text-center">Bid amount: </label>
                    <input
                      value={this.state.value}
                      onChange={event =>
                        this.setState({ value: event.target.value })
                      }
                    />
                  </div>
                  <Button class= "text-center">Make a bid</Button>
                </form>
                <h4 class="text-white justify-center" >Reaveal the Highest Bidder</h4>
                <Button onClick={this.onClick} class = "text-center">Highest Bidder</Button>
                <h4>{this.state.message}</h4>
          </div>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
