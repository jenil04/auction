const path = require('path');  
const fs = require('fs');
const solc = require('solc');

const AuctionPath = path.resolve(__dirname, 'contracts', 'auction.sol') 
const source = fs.readFileSync(AuctionPath, 'utf8') 

module.exports = solc.compile(source, 1).contracts[':auction'];