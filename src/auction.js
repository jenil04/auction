import web3 from "./web3";

let auctionABI = [
  {
    constant: true,
    inputs: [],
    name: "seller",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x08551a53"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "bidders",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0xcff29dfd"
  },
  {
    constant: false,
    inputs: [],
    name: "auction",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x7d9f6db5"
  },
  {
    constant: false,
    inputs: [],
    name: "submitBid",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
    signature: "0xc334b6b2"
  },
  {
    constant: false,
    inputs: [],
    name: "determineWinner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x33b16d93"
  },
  {
    constant: true,
    inputs: [],
    name: "getHighestBidder",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x003495a4"
  }
];
let auctionAddress = "0x4098878608e26825d248f7996267B49f2d1Bd49e";

export default new web3.eth.Contract(auctionABI, auctionAddress);
