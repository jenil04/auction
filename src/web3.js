import Web3 from 'web3';

const web3=new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let auctionABI = [{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"bid","type":"uint256"}],"name":"submitBid","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xbe58196b"},{"constant":true,"inputs":[],"name":"getHighestBidder","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x003495a4"},{"constant":true,"inputs":[],"name":"getTopBid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xe14ae9e0"}]
let auctionAddress ='0xC8A7eF9F06C777D3527A1fD989BB15012F5A1cC9';

web3.eth.defaultAccount = web3.eth.accounts[0]


const auctionContract = web3.eth.contract(auctionABI).at(auctionAddress);

export {auctionContract};