import web3 from './web3';

let auctionABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "seller",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x08551a53"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "latestBidder",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x67a884e5"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "bid",
          "type": "uint256"
        }
      ],
      "name": "auction",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x1200617f"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "name",
          "type": "address"
        },
        {
          "name": "bid",
          "type": "uint256"
        }
      ],
      "name": "submitBid",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xf2a4f2d6"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getHighestBidder",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x003495a4"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTopBid",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xe14ae9e0"
    }
  ]
let auctionAddress ='0x857208FF7c65648C9575F4CE9117887cbF33B66A';

export default new web3.eth.Contract(auctionABI, auctionAddress);
