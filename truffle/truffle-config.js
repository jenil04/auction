var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = 'task honey pony casual globe piano clip prison perfect castle vintage devote';


module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/d662bdba98174b5a9b7c40c6fd631314")
      },
      network_id: 3
    }     
  },
  compilers: {
    solc: {
      version: "0.4.19" 
    }
 }
};

