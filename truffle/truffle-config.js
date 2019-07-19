var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "resemble liquid various present carpet talent soap opera owner remain erase river embody bracket unhappy";


module.exports = {
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "rinkeby.infura.io/v3/d662bdba98174b5a9b7c40c6fd631314")
      },
      network_id: 4
    }   
  }
};
