var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider("resemble liquid various present carpet talent soap opera owner remain erase river embody bracket unhappy", "rinkeby.infura.io/v3/d662bdba98174b5a9b7c40c6fd631314")
      },
      network_id: 4
    }   
  },
  compilers: {
    solc: {
      version: "0.4.19" // ex:  "0.4.20". (Default: Truffle's installed solc)
    }
 }
};
